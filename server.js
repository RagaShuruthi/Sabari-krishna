const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const UPLOADS_DIR = path.join(__dirname, 'images', 'uploads');
const CUSTOM_PHOTOS_FILE = path.join(__dirname, 'custom-photos.json');
const DELETED_DEFAULTS_FILE = path.join(__dirname, 'deleted-defaults.json');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function readJsonFile(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // 25MB limit
      if (body.length > 25 * 1024 * 1024) {
        req.connection.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURI(parsedUrl.pathname);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // --- API: Get Custom Photos ---
  if (pathname === '/api/photos' && req.method === 'GET') {
    const photos = readJsonFile(CUSTOM_PHOTOS_FILE, []);
    sendJson(res, 200, { success: true, photos });
    return;
  }

  // --- API: Add / Save Custom Photo Permanently ---
  if (pathname === '/api/photos' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      if (!data.image) {
        sendJson(res, 400, { success: false, error: 'Image data is required' });
        return;
      }

      let imagePath = data.image;

      // Handle base64 DataURL -> save as physical file to disk
      if (data.image.startsWith('data:image/')) {
        const matches = data.image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (matches) {
          let ext = matches[1].toLowerCase();
          if (ext === 'jpeg') ext = 'jpg';
          const buffer = Buffer.from(matches[2], 'base64');
          const filename = `photo_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
          const diskPath = path.join(UPLOADS_DIR, filename);
          fs.writeFileSync(diskPath, buffer);
          imagePath = `images/uploads/${filename}`;
        }
      }

      const newPhoto = {
        id: data.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        isCustom: true,
        image: imagePath,
        title: data.title || 'Golden Memory',
        message: data.message || 'Always cheering for you, Sabari!',
        tag: data.tag || 'Squad Supporter 🌟',
        createdAt: new Date().toISOString()
      };

      const photos = readJsonFile(CUSTOM_PHOTOS_FILE, []);
      photos.unshift(newPhoto);
      writeJsonFile(CUSTOM_PHOTOS_FILE, photos);

      sendJson(res, 201, { success: true, photo: newPhoto });
    } catch (err) {
      console.error('Error saving photo:', err);
      sendJson(res, 500, { success: false, error: err.message });
    }
    return;
  }

  // --- API: Delete Custom Photo Permanently ---
  if (pathname === '/api/photos' && (req.method === 'DELETE' || (req.method === 'POST' && parsedUrl.query.action === 'delete'))) {
    try {
      let photoId = parsedUrl.query.id;
      if (!photoId) {
        const body = await parseBody(req);
        photoId = body.id;
      }

      if (!photoId) {
        sendJson(res, 400, { success: false, error: 'Photo ID is required' });
        return;
      }

      const photos = readJsonFile(CUSTOM_PHOTOS_FILE, []);
      const index = photos.findIndex(p => p.id === photoId);
      if (index !== -1) {
        const removed = photos[index];
        // If image was saved in uploads directory, remove the file from disk
        if (removed.image && (removed.image.startsWith('images/uploads/') || removed.image.startsWith('/images/uploads/'))) {
          const cleanRel = removed.image.replace(/^\//, '');
          const diskPath = path.join(__dirname, cleanRel);
          if (fs.existsSync(diskPath)) {
            try { fs.unlinkSync(diskPath); } catch (e) { console.warn('Could not unlink photo file:', e); }
          }
        }
        photos.splice(index, 1);
        writeJsonFile(CUSTOM_PHOTOS_FILE, photos);
        sendJson(res, 200, { success: true, deletedId: photoId });
      } else {
        sendJson(res, 404, { success: false, error: 'Photo not found in custom list' });
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
      sendJson(res, 500, { success: false, error: err.message });
    }
    return;
  }

  // --- API: Deleted Default Photos (Tracks default photos that user deleted) ---
  if (pathname === '/api/deleted-defaults' && req.method === 'GET') {
    const deletedIds = readJsonFile(DELETED_DEFAULTS_FILE, []);
    sendJson(res, 200, { success: true, deletedIds });
    return;
  }

  if (pathname === '/api/deleted-defaults' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      if (!data.id) {
        sendJson(res, 400, { success: false, error: 'ID is required' });
        return;
      }
      const deletedIds = readJsonFile(DELETED_DEFAULTS_FILE, []);
      if (!deletedIds.includes(data.id)) {
        deletedIds.push(data.id);
        writeJsonFile(DELETED_DEFAULTS_FILE, deletedIds);
      }
      sendJson(res, 200, { success: true, deletedIds });
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message });
    }
    return;
  }

  // --- API: Reset Deleted Defaults ---
  if (pathname === '/api/reset-defaults' && req.method === 'POST') {
    writeJsonFile(DELETED_DEFAULTS_FILE, []);
    sendJson(res, 200, { success: true, message: 'Default photos restored' });
    return;
  }

  // --- Static File Serving ---
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);

  // Security: prevent path traversal outside workspace
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/ with Permanent Photo Persistence API`);
});
