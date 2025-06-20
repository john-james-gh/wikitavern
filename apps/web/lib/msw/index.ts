async function initMocks() {
  if (typeof window === "undefined") {
    const {server} = await import("./node")
    server.listen()
  } else {
    const {worker} = await import("./browser")
    worker.start()
  }
}

initMocks()

export {}
