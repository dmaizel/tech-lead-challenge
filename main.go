package main

import "tech-lead-challenge/service/logingest"

func main() {
	logingest.NewLogIngester("fs", "/Users/chen.keinan/workspace/tech-lead-challenge/example/docker.log").LoadLogFromSource()
}
