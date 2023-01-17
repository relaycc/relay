import { Copy } from "@/lib/design/Copy";

const handleClick = () => {
  console.log('hello')
}

export default function Messages() {
  return <main style={{marginTop: '100px', marginLeft: '100px'}}>
    <Copy hoverText="Copy Address" onCopy={handleClick} />
  </main>;
}
