// setup-clean-architecture.js
const fs = require("fs");
const path = require("path");

// Estrutura base do projeto
const structure = {
  src: {
    presentation: {
      components: {
        "TodoItem.js": "",
        "TodoInput.js": "",
      },
      screens: {
        "HomeScreen.js": "",
      },
      "AppContainer.js": "",
    },
    domain: {
      entities: {
        "Todo.js": "",
      },
      repositories: {
        "TodoRepository.js": `// Interface (Contrato)
export class TodoRepository {
  getTodos() {}
  addTodo(todo) {}
  toggleTodo(id) {}
}
`,
      },
      usecases: {
        "GetTodos.js": "",
        "AddTodo.js": "",
        "ToggleTodo.js": "",
      },
    },
    data: {
      models: {
        "TodoModel.js": "",
      },
      datasources: {
        "LocalTodoDataSource.js": "",
      },
      repositories: {
        "TodoRepositoryImpl.js": "",
      },
    },
    di: {
      "container.js": `// Dependency Injection Container
import { TodoRepositoryImpl } from '../data/repositories/TodoRepositoryImpl';
import { LocalTodoDataSource } from '../data/datasources/LocalTodoDataSource';

export const container = {
  todoRepository: new TodoRepositoryImpl(new LocalTodoDataSource()),
};
`,
    },
  },
  "App.js": `import React from 'react';
import { AppContainer } from './src/presentation/AppContainer';

export default function App() {
  return <AppContainer />;
}
`,
};

// Função recursiva para criar pastas e arquivos
function createStructure(basePath, obj) {
  for (const key in obj) {
    const fullPath = path.join(basePath, key);

    if (typeof obj[key] === "object") {
      // Cria diretório
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        console.log("📁 Pasta criada:", fullPath);
      }
      // Chama recursivamente
      createStructure(fullPath, obj[key]);
    } else {
      // Cria arquivo
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, obj[key]);
        console.log("📄 Arquivo criado:", fullPath);
      }
    }
  }
}

// Ponto de partida
const root = process.cwd(); // diretório atual
createStructure(root, structure);

console.log("\n✅ Estrutura Clean Architecture criada com sucesso!");
