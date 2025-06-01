const http = require('http');
const path = require('path');
const filePath = path.join(__dirname, '/json/todo.json');
const fs = require('fs');
// console.log(filePath);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathUrl = url.pathname;
  console.log(url);
  if (pathUrl === '/todos' && req.method === 'GET') {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    res.writeHead(200, {
      'content-type': 'application/json',
      email: 'mdhamim5088@gmail.com',
    });
    res.end(data);
  } else if (pathUrl === '/todo/create-todo' && req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data = data + chunk;
      console.log(data);
      const createAt = new Date().toLocaleString();
      const { name, email } = JSON.parse(data);
      const geAllTodos = fs.readFileSync(filePath, { encoding: 'utf-8' });
      console.log(geAllTodos);
      const parsegeAllTodos = JSON.parse(geAllTodos);
      console.log(parsegeAllTodos);
      parsegeAllTodos.push({ name, email, createAt });
      console.log(parsegeAllTodos);

      fs.writeFileSync(filePath, JSON.stringify(parsegeAllTodos, null, 2), {
        encoding: 'utf-8',
      });
      res.end(JSON.stringify({ name, email, createAt }, null, 2));
    });
    // res.end('Create new todos');
  } else if (pathUrl === '/todo' && req.method === 'GET') {
    const email = url.searchParams.get('email');
    console.log(email);
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const parseData = JSON.parse(data);
    const findTodo = parseData.find((p) => p.email === email);
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(JSON.stringify(findTodo));
  } else if (pathUrl === '/todo/update-todo' && req.method === 'PATCH') {
    const email = url.searchParams.get('email');
    let data = '';
    req.on('data', (chunk) => {
      data = data + chunk;
    });

    req.on('end', () => {
      const { name } = JSON.parse(data);

      const geAllTodos = fs.readFileSync(filePath, { encoding: 'utf-8' });
      const parsegeAllTodos = JSON.parse(geAllTodos);

      const TodoIndex = parsegeAllTodos.findIndex(
        (todo) => todo.email === email
      );
      console.log(parsegeAllTodos[TodoIndex]);
      parsegeAllTodos[TodoIndex].name = name;

      fs.writeFileSync(filePath, JSON.stringify(parsegeAllTodos, null, 2), {
        encoding: 'utf-8',
      });

      res.end(
        JSON.stringify(
          { name, createAt: parsegeAllTodos[TodoIndex].createAt },
          null,
          2
        )
      );
    });
  } else if (pathUrl === '/todo/delete-todo' && req.method === 'DELETE') {
    const email = url.searchParams.get('email');
    // let data = '';
    // req.on('data', (chunk) => {
    //   data = data + chunk;
    // });

    // const { name } = JSON.parse(data);

    const geAllTodos = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const parsegeAllTodos = JSON.parse(geAllTodos);
    const todoFilter = parsegeAllTodos.filter((tf) => tf.email !== email);
    console.log(todoFilter);

    fs.writeFileSync(filePath, JSON.stringify(todoFilter, null, 2), {
      encoding: 'utf-8',
    });

    // res.end(
    //   JSON.stringify(
    //     { name, createAt: parsegeAllTodos[TodoIndex].createAt },
    //     null,
    //     2
    //   )
    // );
    res.end('Delete Successfull');
  } else {
    res.end('No route found!');
  }
});

server.listen(5000, '127.0.0.1', () => {
  console.log('Server running succesfully port 5000');
});
