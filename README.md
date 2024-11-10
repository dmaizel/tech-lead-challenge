# Tech Lead Coding Challenge: Distributed Log Analysis System

## Background
Your company operates a large-scale microservices architecture with hundreds of services running across multiple Kubernetes clusters. The DevOps team needs a robust, scalable system to collect, analyze, and visualize logs from all these services in real-time.

## Your Task
Design and implement core components of a simplified distributed log analysis system. You have **3 hours** to complete as much as possible. Focus on demonstrating your system design skills, code quality, and ability to make trade-offs under time constraints.

### Requirements

 1. Log Ingestion Service
    - **Goal:** Create a service to ingest logs from multiple sources (e.g., Kubernetes pods, Docker containers).
    - **Key Feature:** The service should handle up to **10,000 logs per second**.

2. Basic Log Processing Pipeline
    - **Goal:** Implement basic log parsing and enrichment (e.g., adding metadata).
    - **Stretch:** Standardizing formats.

3. Query Service
    - **Goal:** Implement a simple query API to retrieve logs based on criteria like time range and log level.
    - **Stretch:** Include one additional feature, such as aggregation or pattern matching.

4. Real-time Alerting (Basic)
    - **Goal:** Design a simple real-time alerting system.
    - **Implementation:**
       - Trigger alerts based on log patterns or thresholds (e.g., error logs exceeding a certain count or specific error messages appearing).
       - Send a mock notification (e.g., print to the console, log to a file) when the alert condition is met.

5. System Architecture
   - **Goal:** Provide a high-level architecture diagram of the system.
   - **Explain how the system would scale to handle increasing load.**
   - **Discuss potential failure points and how you'd address them.**


## Evaluation Criteria
- System design and architecture
- Code quality and organization
- Performance considerations and optimizations
- Error handling and logging
- Scalability and distributed systems concepts
- Ability to explain design decisions and trade-offs
- Completeness of solution given time constraints

## Deliverables
1. Source code for implemented components
2. Architecture diagram and explanation
3. README with:
   - Setup and run instructions
   - Explanation of design decisions and trade-offs
   - Discussion of what you'd do differently with more time
4. Brief presentation (5-10 minutes) of your solution, followed by a Q&A session

## Note
You're not expected to implement all services or features in the given timeframe. As a tech lead, part of your role is to make decisions about what to prioritize given limited time and resources. Choose the components and features you believe are most critical or best demonstrate your skills and approach. Be prepared to explain your choices and discuss how you'd implement the remaining parts if given more time.

## Submission Instructions
1. Fork this repository to your own GitHub account.
2. Clone your forked repository to your local machine.
3. Create a new branch for your work.
4. Implement your solution, making commits as you go.
5. Push your changes to your GitHub repository.
6. Create a pull request from your branch to the main branch of your forked repository.
7. Send us the link to your pull request for review.

Good luck!
