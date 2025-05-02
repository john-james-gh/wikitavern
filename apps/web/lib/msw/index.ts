async function initMocks() {
  if (typeof window === "undefined") {
    const {server} = await import("./node")
    server.listen()
    server.events.on("request:start", ({request}) => {
      console.info("MSW intercepted:", request.method, request.url)
    })
  } else {
    const {worker} = await import("./browser")
    worker.start()
  }
}

initMocks()

export {}
