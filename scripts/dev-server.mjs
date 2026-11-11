import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const port=Number(process.env.PORT||4173);
const root=path.resolve(process.env.STATIC_DIR||'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{
 try{
  const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
  const pathname=decodeURIComponent(url.pathname);
  const candidate=path.resolve(root,`.${pathname}`);
  if(!(candidate===root||candidate.startsWith(root+path.sep))){res.writeHead(403);res.end('Forbidden');return}
  const file=fs.existsSync(candidate)&&fs.statSync(candidate).isDirectory()?path.join(candidate,'index.html'):candidate;
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return}
  res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':file.endsWith('.html')?'no-cache':'public, max-age=3600'});
  fs.createReadStream(file).pipe(res);
 }catch{res.writeHead(400);res.end('Bad request')}
});
server.listen(port,()=>console.log(`Portfolio preview: http://localhost:${port}`));
