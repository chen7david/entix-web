import { Button, message } from "antd";
function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button type="primary" onClick={() => message.success("Hello World")}>
        Click me
      </Button>
    </div>
  );
}

export default App;
