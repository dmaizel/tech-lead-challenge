package main

import "tech-lead-challenge/service/logingest"

func main() {
	logingest.NewLogIngester("fs", "/Users/chen.keinan/workspace/work/tech-lead-challenge/example/docker.log").LoadLogFromSource()
}
