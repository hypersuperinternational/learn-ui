import { renderToReadableStream } from "react-dom/server";

interface ServerSideTestProps {
    message: string
}
const ServerSideTest: React.FC<ServerSideTestProps> = ({message}) => {
    return (
        <body>
          <h1>{message}</h1>
        </body>
    )
}

export async function renderServerSideTest(message: string) {
    return await renderToReadableStream(
      <ServerSideTest message={message} />
    )
}