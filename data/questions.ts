export type Domain = 1 | 2 | 3 | 4;

export interface Question {
  id: number;
  domain: Domain;
  text: string;
  type: "single" | "multi";
  options: string[];
  correct: number[]; // indices into options[]
  explanation: string;
  service?: string; // primary AWS service being tested
}

export const DOMAIN_NAMES: Record<Domain, string> = {
  1: "Cloud Concepts",
  2: "Security & Compliance",
  3: "Cloud Technology & Services",
  4: "Billing, Pricing & Support",
};

export const DOMAIN_WEIGHTS: Record<Domain, number> = {
  1: 24,
  2: 30,
  3: 34,
  4: 12,
};

export const questions: Question[] = [
  // ─── DOMAIN 1: Cloud Concepts ───────────────────────────────────────────────
  {
    id: 1,
    domain: 1,
    text: "Which of the following best describes the 'on-demand self-service' characteristic of cloud computing?",
    type: "single",
    options: [
      "Cloud resources can be accessed from anywhere via the internet",
      "Users can provision computing resources without requiring human interaction with the service provider",
      "Multiple customers share the same physical infrastructure",
      "Resources can be rapidly scaled up or down based on demand",
    ],
    correct: [1],
    explanation:
      "On-demand self-service means a consumer can unilaterally provision computing capabilities—such as server time and network storage—as needed automatically, without requiring human interaction with each service provider. The other options describe broad network access, multi-tenancy, and rapid elasticity respectively.",
  },
  {
    id: 2,
    domain: 1,
    text: "A company is migrating from on-premises infrastructure to AWS. Which financial benefit most accurately describes this transition?",
    type: "single",
    options: [
      "Eliminating all IT costs",
      "Trading capital expense (CapEx) for operational expense (OpEx)",
      "Reducing the number of IT staff required",
      "Eliminating the need for software licenses",
    ],
    correct: [1],
    explanation:
      "One of the six advantages of cloud computing is trading capital expense (buying data center hardware upfront) for operational expense (paying only for what you consume). This improves cash flow and removes the need to invest in infrastructure before you know how you'll use it.",
  },
  {
    id: 3,
    domain: 1,
    text: "Which cloud deployment model allows a company to keep sensitive data on-premises while leveraging cloud resources for less sensitive workloads?",
    type: "single",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
    correct: [2],
    explanation:
      "A hybrid cloud keeps some servers on-premises and extends capabilities to the public cloud. This gives companies control over sensitive assets in their private infrastructure while benefiting from the flexibility and cost-effectiveness of the public cloud.",
  },
  {
    id: 4,
    domain: 1,
    text: "Which of the following are characteristics of cloud computing according to the NIST definition? (Select TWO)",
    type: "multi",
    options: [
      "Dedicated hardware per customer",
      "Rapid elasticity",
      "Measured service",
      "Fixed monthly billing",
      "Manual provisioning by the provider",
    ],
    correct: [1, 2],
    explanation:
      "The five NIST characteristics of cloud computing are: on-demand self-service, broad network access, resource pooling (multi-tenancy), rapid elasticity, and measured service (pay for what you use). Dedicated hardware, fixed billing, and manual provisioning are the opposite of cloud characteristics.",
  },
  {
    id: 5,
    domain: 1,
    text: "A startup wants to avoid guessing infrastructure capacity needs. Which advantage of cloud computing addresses this?",
    type: "single",
    options: [
      "Trade CapEx for OpEx",
      "Go global in minutes",
      "Stop guessing capacity",
      "Benefit from massive economies of scale",
    ],
    correct: [2],
    explanation:
      "One of the six advantages of cloud computing is 'stop guessing capacity.' With cloud, you can access as much or as little capacity as you need and scale up/down with only a few minutes' notice, eliminating costly over-provisioning or under-provisioning.",
  },
  {
    id: 6,
    domain: 1,
    text: "Which type of cloud computing service model gives developers the most control over the underlying operating system?",
    type: "single",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Function as a Service (FaaS)",
    ],
    correct: [2],
    explanation:
      "IaaS provides the highest level of flexibility and control. With IaaS (like Amazon EC2), you manage the OS, middleware, and applications. With PaaS you manage only the applications, and with SaaS everything is managed for you.",
  },
  {
    id: 7,
    domain: 1,
    text: "Gmail and Dropbox are examples of which cloud service model?",
    type: "single",
    options: ["IaaS", "PaaS", "SaaS", "DaaS"],
    correct: [2],
    explanation:
      "Gmail and Dropbox are SaaS (Software as a Service) — completed products run and managed by the service provider. Users simply use the software without managing any underlying infrastructure.",
  },
  {
    id: 8,
    domain: 1,
    text: "Which AWS Well-Architected Framework pillar focuses on the ability of a system to recover from failures and meet business continuity requirements?",
    type: "single",
    options: [
      "Performance Efficiency",
      "Reliability",
      "Operational Excellence",
      "Security",
    ],
    correct: [1],
    explanation:
      "The Reliability pillar focuses on the ability of a workload to perform its intended function correctly and consistently, including the ability to operate and test the workload through its total lifecycle, and recover from failures.",
  },
  {
    id: 9,
    domain: 1,
    text: "Which design principle of the AWS Cloud suggests running systems in such a way that workloads are automatically recoverable from failures?",
    type: "single",
    options: [
      "Implement elasticity",
      "Design for failure",
      "Think parallel",
      "Decouple components",
    ],
    correct: [1],
    explanation:
      "Designing for failure means you architect your systems assuming any component can fail. By doing this, you build resilience in (via redundancy, automated recovery, multi-AZ deployments), so failure of a component doesn't mean failure of the whole system.",
  },
  {
    id: 10,
    domain: 1,
    text: "A company needs to deploy an application globally with the lowest possible latency. Which AWS advantage best supports this?",
    type: "single",
    options: [
      "Economies of scale",
      "Elasticity",
      "Go global in minutes",
      "Stop spending money on data centers",
    ],
    correct: [2],
    explanation:
      "AWS's global infrastructure allows you to deploy applications to multiple regions around the world with just a few clicks. This 'go global in minutes' advantage means you can provide low latency and a better experience to customers worldwide.",
  },
  {
    id: 11,
    domain: 1,
    text: "What is the AWS Cloud Adoption Framework (AWS CAF) primarily used for?",
    type: "single",
    options: [
      "Deploying serverless applications",
      "Helping organizations plan and execute a successful cloud migration",
      "Monitoring AWS resource costs",
      "Providing a framework for creating IAM policies",
    ],
    correct: [1],
    explanation:
      "The AWS Cloud Adoption Framework (CAF) provides guidance and best practices to help organizations build a comprehensive approach to cloud computing across the organization and throughout the IT lifecycle. It has six perspectives: Business, People, Governance, Platform, Security, and Operations.",
  },
  {
    id: 12,
    domain: 1,
    text: "Which perspective in the AWS Cloud Adoption Framework (CAF) focuses on ensuring business outcomes align with cloud initiatives?",
    type: "single",
    options: [
      "Operations perspective",
      "Platform perspective",
      "Business perspective",
      "Governance perspective",
    ],
    correct: [2],
    explanation:
      "The Business perspective of AWS CAF ensures that IT aligns with business needs and that IT investments link to key business results. It is used to create a strong business case for cloud adoption.",
  },
  {
    id: 13,
    domain: 1,
    text: "Which of the following is NOT one of the five characteristics of cloud computing?",
    type: "single",
    options: [
      "On-demand self-service",
      "Dedicated hardware allocation",
      "Broad network access",
      "Measured service",
    ],
    correct: [1],
    explanation:
      "The five NIST characteristics of cloud computing are: on-demand self-service, broad network access, resource pooling (multi-tenancy — shared hardware), rapid elasticity, and measured service. 'Dedicated hardware allocation' is the opposite of resource pooling.",
  },

  // ─── DOMAIN 2: Security & Compliance ────────────────────────────────────────
  {
    id: 14,
    domain: 2,
    text: "Under the AWS Shared Responsibility Model, which of the following is the customer's responsibility?",
    type: "single",
    options: [
      "Patching the hypervisor",
      "Physical security of data centers",
      "Configuring security groups on EC2 instances",
      "Maintaining the underlying network infrastructure",
    ],
    correct: [2],
    explanation:
      "Security OF the cloud is AWS's responsibility (hardware, network, hypervisor, physical facilities). Security IN the cloud is the customer's responsibility. Configuring security groups — the virtual firewall controlling traffic to EC2 instances — is a customer responsibility.",
    service: "Shared Responsibility Model",
  },
  {
    id: 15,
    domain: 2,
    text: "Which of the following is AWS's responsibility under the Shared Responsibility Model for Amazon RDS? (Select TWO)",
    type: "multi",
    options: [
      "Managing database user accounts",
      "Patching the database engine",
      "Encrypting data at rest (if enabled by the customer)",
      "Replacing faulty hardware",
      "Creating database tables and schemas",
    ],
    correct: [1, 3],
    explanation:
      "For managed services like RDS, AWS takes on more responsibility: AWS patches the DB engine and replaces faulty hardware. The customer manages DB users, schemas, data, and chooses whether to enable encryption. Encryption configuration is a shared responsibility, but once enabled, AWS manages the underlying encryption hardware.",
    service: "RDS",
  },
  {
    id: 16,
    domain: 2,
    text: "Which IAM entity should be used to grant an EC2 instance permission to access an S3 bucket?",
    type: "single",
    options: ["IAM User with access keys", "IAM Group", "IAM Role", "IAM Policy"],
    correct: [2],
    explanation:
      "IAM Roles are designed to be assumed by AWS services (like EC2). An EC2 instance assumes an IAM role, which provides temporary credentials to access other AWS services. You should never embed long-term access keys in EC2 instances — use roles instead.",
    service: "IAM",
  },
  {
    id: 17,
    domain: 2,
    text: "What is the recommended best practice for the AWS root account?",
    type: "single",
    options: [
      "Use it for day-to-day administrative tasks",
      "Share credentials with the security team",
      "Enable MFA and avoid using it for daily tasks",
      "Create access keys for programmatic access",
    ],
    correct: [2],
    explanation:
      "The root account has unrestricted access to all AWS resources. Best practice is to enable MFA on the root account and use it only for account management tasks that require root-level access (like changing account settings or closing the account). Create IAM users for daily tasks.",
    service: "IAM",
  },
  {
    id: 18,
    domain: 2,
    text: "A company needs to audit all API calls made in their AWS account, including the identity of the caller, time, and source IP. Which service provides this?",
    type: "single",
    options: ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "Amazon Inspector"],
    correct: [1],
    explanation:
      "AWS CloudTrail records API calls made in your AWS account — the event history of actions taken through the AWS Management Console, SDKs, CLI, and other services. It captures who made the call, when, from where, and what resources were affected.",
    service: "CloudTrail",
  },
  {
    id: 19,
    domain: 2,
    text: "Which AWS service continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads using machine learning?",
    type: "single",
    options: ["AWS Inspector", "Amazon Macie", "Amazon GuardDuty", "AWS Security Hub"],
    correct: [2],
    explanation:
      "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior. It uses machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats.",
    service: "GuardDuty",
  },
  {
    id: 20,
    domain: 2,
    text: "Which service is used to download AWS compliance reports such as SOC reports and PCI DSS documentation?",
    type: "single",
    options: ["AWS Trusted Advisor", "AWS Artifact", "AWS Config", "AWS Inspector"],
    correct: [1],
    explanation:
      "AWS Artifact is a self-service portal for on-demand access to AWS compliance reports and agreements, including SOC reports, PCI DSS, ISO certifications, and more.",
    service: "Artifact",
  },
  {
    id: 21,
    domain: 2,
    text: "What is the difference between Security Groups and Network Access Control Lists (NACLs) in AWS?",
    type: "single",
    options: [
      "Security Groups are stateless; NACLs are stateful",
      "Security Groups operate at the subnet level; NACLs operate at the instance level",
      "Security Groups are stateful and operate at the instance level; NACLs are stateless and operate at the subnet level",
      "Both operate at the instance level, but NACLs allow deny rules",
    ],
    correct: [2],
    explanation:
      "Security Groups are stateful (return traffic is automatically allowed) and operate at the EC2 instance level — they only allow rules, not deny rules. NACLs are stateless (return traffic must be explicitly allowed), operate at the subnet level, and support both allow and deny rules.",
    service: "VPC",
  },
  {
    id: 22,
    domain: 2,
    text: "A company wants to protect their web application from SQL injection and cross-site scripting (XSS) attacks. Which AWS service should they use?",
    type: "single",
    options: ["AWS Shield", "AWS WAF", "Amazon GuardDuty", "AWS Firewall Manager"],
    correct: [1],
    explanation:
      "AWS WAF (Web Application Firewall) protects web applications from common Layer 7 exploits like SQL injection and XSS. It lets you define Web ACLs with rules based on IP addresses, HTTP headers, body, URI strings, and rate-based rules.",
    service: "WAF",
  },
  {
    id: 23,
    domain: 2,
    text: "Which AWS service provides hardware security modules (HSMs) in the cloud to help meet corporate, contractual, and regulatory compliance requirements?",
    type: "single",
    options: ["AWS KMS", "AWS CloudHSM", "AWS Secrets Manager", "AWS Certificate Manager"],
    correct: [1],
    explanation:
      "AWS CloudHSM provides dedicated hardware security modules in the cloud. Unlike KMS (where AWS manages the hardware), CloudHSM gives you exclusive, single-tenant access to HSMs, useful for compliance requirements mandating customer-controlled keys.",
    service: "CloudHSM",
  },
  {
    id: 24,
    domain: 2,
    text: "Which AWS service can automatically discover, classify, and protect sensitive data (like PII) stored in Amazon S3?",
    type: "single",
    options: ["Amazon Inspector", "Amazon GuardDuty", "Amazon Macie", "AWS Config"],
    correct: [2],
    explanation:
      "Amazon Macie uses machine learning to automatically discover, classify, and protect sensitive data in Amazon S3. It can identify PII, financial data, and other sensitive information, helping you meet data privacy and compliance requirements.",
    service: "Macie",
  },
  {
    id: 25,
    domain: 2,
    text: "Which DDoS protection service is automatically included at no extra cost for all AWS customers?",
    type: "single",
    options: [
      "AWS Shield Advanced",
      "AWS WAF",
      "AWS Shield Standard",
      "Amazon GuardDuty",
    ],
    correct: [2],
    explanation:
      "AWS Shield Standard is automatically enabled for all AWS customers at no additional cost. It provides protection against common, most frequently occurring network and transport layer DDoS attacks (SYN/UDP floods, reflection attacks). Shield Advanced is an optional paid tier ($3,000/month) with 24/7 DDoS response team access.",
    service: "Shield",
  },
  {
    id: 26,
    domain: 2,
    text: "A company needs to rotate database passwords automatically and store them securely. Which AWS service is best suited for this?",
    type: "single",
    options: [
      "AWS Systems Manager Parameter Store",
      "AWS Secrets Manager",
      "AWS KMS",
      "AWS Certificate Manager",
    ],
    correct: [1],
    explanation:
      "AWS Secrets Manager is specifically designed to store, rotate, manage, and retrieve secrets like database credentials, API keys, and other secrets. It can automatically rotate secrets on a schedule, reducing the risk of compromised credentials. Parameter Store can also store secrets but doesn't natively rotate them.",
    service: "Secrets Manager",
  },
  {
    id: 27,
    domain: 2,
    text: "What does the 'Principle of Least Privilege' mean in the context of AWS IAM?",
    type: "single",
    options: [
      "Users should only be granted permission to perform their job functions and nothing more",
      "Admins should have full access to all AWS services",
      "Developers should share a single IAM user account",
      "The root account should be used for least-critical operations",
    ],
    correct: [0],
    explanation:
      "The Principle of Least Privilege means granting only the minimum permissions necessary for a user or service to perform their required tasks. In IAM, this means creating policies with only the exact actions and resources needed, reducing the blast radius if credentials are compromised.",
    service: "IAM",
  },
  {
    id: 28,
    domain: 2,
    text: "Which of the following AWS services help evaluate security posture and provide automated checks against AWS best practices? (Select TWO)",
    type: "multi",
    options: [
      "Amazon CloudWatch",
      "AWS Trusted Advisor",
      "Amazon Inspector",
      "AWS CloudFormation",
      "AWS Artifact",
    ],
    correct: [1, 2],
    explanation:
      "AWS Trusted Advisor provides real-time guidance across cost optimization, performance, security, fault tolerance, and service limits — including security checks like open S3 buckets and unrestricted security group access. Amazon Inspector automatically assesses applications for security vulnerabilities and deviations from best practices.",
    service: "Trusted Advisor",
  },
  {
    id: 29,
    domain: 2,
    text: "Which AWS service enables you to define and enforce security policies across multiple AWS accounts in an organization?",
    type: "single",
    options: [
      "AWS IAM",
      "AWS Control Tower",
      "AWS Organizations with Service Control Policies (SCPs)",
      "AWS Config",
    ],
    correct: [2],
    explanation:
      "AWS Organizations with Service Control Policies (SCPs) allows you to define maximum available permissions for accounts in your organization. SCPs are applied at the organization, OU (Organizational Unit), or account level and cannot grant permissions — they only restrict what IAM policies can allow.",
    service: "Organizations",
  },
  {
    id: 30,
    domain: 2,
    text: "An organization needs temporary security credentials for a user who needs to access AWS resources for a short time. Which service provides this?",
    type: "single",
    options: [
      "IAM User with access keys",
      "AWS Security Token Service (STS)",
      "Amazon Cognito",
      "AWS Directory Service",
    ],
    correct: [1],
    explanation:
      "AWS STS (Security Token Service) generates temporary security credentials (access key ID, secret access key, and session token) for users who need short-term access to AWS resources. Credentials can be valid from minutes to hours.",
    service: "STS",
  },
  {
    id: 31,
    domain: 2,
    text: "Which of the following actions require root account credentials and cannot be performed by any IAM user? (Select TWO)",
    type: "multi",
    options: [
      "Creating an IAM admin user",
      "Changing the AWS account name",
      "Creating an S3 bucket",
      "Closing the AWS account",
      "Launching an EC2 instance",
    ],
    correct: [1, 3],
    explanation:
      "Tasks that require root account credentials include: changing your account name, email address, or password; changing your AWS support plan; closing the AWS account; restoring IAM user permissions; and changing/canceling Reserved Instances. Creating IAM users, S3 buckets, and EC2 instances can all be done by IAM admins.",
    service: "IAM",
  },
  {
    id: 32,
    domain: 2,
    text: "Which compliance program does AWS participate in that is relevant to payment card industry data security?",
    type: "single",
    options: ["SOC 2", "HIPAA", "PCI DSS", "GDPR"],
    correct: [2],
    explanation:
      "AWS is certified as a PCI DSS Level 1 service provider, which is the highest level of assessment available in the Payment Card Industry Data Security Standard. This means AWS infrastructure can be used to build PCI-compliant applications for processing cardholder data.",
    service: "Artifact",
  },

  // ─── DOMAIN 3: Cloud Technology & Services ───────────────────────────────────
  {
    id: 33,
    domain: 3,
    text: "A company needs to run a web application with variable traffic. They want to automatically adjust capacity based on demand. Which AWS feature provides this?",
    type: "single",
    options: [
      "Amazon EC2 Reserved Instances",
      "AWS Auto Scaling Groups",
      "Amazon EC2 Dedicated Hosts",
      "AWS Elastic Beanstalk",
    ],
    correct: [1],
    explanation:
      "Auto Scaling Groups (ASG) automatically launch or terminate EC2 instances based on defined scaling policies (e.g., CPU utilization, request count). This ensures you have the right number of EC2 instances available to handle load, and scales down to reduce costs when demand drops.",
    service: "Auto Scaling",
  },
  {
    id: 34,
    domain: 3,
    text: "Which EC2 pricing option is most cost-effective for a steady-state, predictable workload that runs continuously for 1 year?",
    type: "single",
    options: [
      "On-Demand Instances",
      "Spot Instances",
      "Reserved Instances (1-year)",
      "Dedicated Hosts",
    ],
    correct: [2],
    explanation:
      "Reserved Instances provide a significant discount (up to 72%) compared to On-Demand pricing for a commitment of 1 or 3 years. They are ideal for steady-state, predictable workloads. Spot Instances are cheaper but can be interrupted. On-Demand is the most expensive for continuous use.",
    service: "EC2",
  },
  {
    id: 35,
    domain: 3,
    text: "Which EC2 pricing model allows AWS to reclaim instances when capacity is needed, making it suitable for fault-tolerant batch processing jobs?",
    type: "single",
    options: ["On-Demand", "Reserved", "Spot", "Dedicated"],
    correct: [2],
    explanation:
      "Spot Instances let you use spare EC2 capacity at up to 90% discount vs On-Demand pricing. However, AWS can reclaim (interrupt) Spot Instances with a 2-minute warning when capacity is needed elsewhere. They are best for fault-tolerant, flexible workloads like batch jobs, data analysis, and image processing.",
    service: "EC2",
  },
  {
    id: 36,
    domain: 3,
    text: "What is the purpose of an Amazon Machine Image (AMI)?",
    type: "single",
    options: [
      "A virtual network that isolates AWS resources",
      "A template that contains the software configuration for launching an EC2 instance",
      "A managed service for running Docker containers",
      "A snapshot of an EBS volume",
    ],
    correct: [1],
    explanation:
      "An AMI (Amazon Machine Image) is a pre-configured template that provides the information required to launch an EC2 instance. It includes the operating system, pre-installed software, and configuration settings. You can use AWS-provided AMIs, marketplace AMIs, or create your own custom AMIs.",
    service: "EC2",
  },
  {
    id: 37,
    domain: 3,
    text: "Which storage service provides a fully managed Network File System (NFS) that can be mounted on hundreds of EC2 instances simultaneously across multiple Availability Zones?",
    type: "single",
    options: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon EFS",
      "Amazon FSx",
    ],
    correct: [2],
    explanation:
      "Amazon EFS (Elastic File System) is a fully managed NFS that can be mounted on many EC2 instances simultaneously across multiple AZs. Unlike EBS (which is attached to a single instance), EFS provides shared file storage for Linux workloads. It scales automatically and charges per GB used.",
    service: "EFS",
  },
  {
    id: 38,
    domain: 3,
    text: "A developer wants to store objects (files) at massive scale with high durability. Which storage service should they use?",
    type: "single",
    options: ["Amazon EBS", "Amazon EFS", "Amazon S3", "Amazon Glacier"],
    correct: [2],
    explanation:
      "Amazon S3 (Simple Storage Service) is object storage designed for durability of 99.999999999% (11 nines). It can store objects from 0 bytes to 5TB, with unlimited total storage capacity. It's the primary service for storing files, backups, static website content, and data lakes.",
    service: "S3",
  },
  {
    id: 39,
    domain: 3,
    text: "Which S3 storage class is most cost-effective for data that is accessed infrequently but must be retrieved immediately when needed?",
    type: "single",
    options: [
      "S3 Standard",
      "S3 Standard-IA (Infrequent Access)",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA",
    ],
    correct: [1],
    explanation:
      "S3 Standard-IA is designed for data that is accessed less frequently but requires rapid access when needed. It offers lower storage cost than S3 Standard but charges a retrieval fee. Glacier Deep Archive is cheapest but has retrieval times of hours. One Zone-IA is cheaper but stores data in only one AZ.",
    service: "S3",
  },
  {
    id: 40,
    domain: 3,
    text: "Which S3 feature allows you to automatically move objects to cheaper storage classes based on access patterns?",
    type: "single",
    options: [
      "S3 Versioning",
      "S3 Cross-Region Replication",
      "S3 Lifecycle Policies",
      "S3 Transfer Acceleration",
    ],
    correct: [2],
    explanation:
      "S3 Lifecycle Policies allow you to automatically transition objects between storage classes (e.g., from Standard to Standard-IA after 30 days, then to Glacier after 90 days) or expire (delete) objects after a defined period. This reduces storage costs without manual intervention.",
    service: "S3",
  },
  {
    id: 41,
    domain: 3,
    text: "What is Amazon RDS, and which use case is it best suited for?",
    type: "single",
    options: [
      "A NoSQL database service for key-value and document workloads",
      "A managed relational database service supporting MySQL, PostgreSQL, Oracle, SQL Server, and more",
      "An in-memory caching service for sub-millisecond latency",
      "A data warehouse service for analytics on petabytes of data",
    ],
    correct: [1],
    explanation:
      "Amazon RDS (Relational Database Service) is a managed relational database supporting MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora. AWS handles provisioning, patching, backups, and high availability — you manage schemas, queries, and application-level concerns.",
    service: "RDS",
  },
  {
    id: 42,
    domain: 3,
    text: "Which AWS database service is fully serverless, supports key-value and document data, and delivers single-digit millisecond performance at any scale?",
    type: "single",
    options: ["Amazon RDS", "Amazon Aurora", "Amazon DynamoDB", "Amazon Redshift"],
    correct: [2],
    explanation:
      "Amazon DynamoDB is a fully managed, serverless NoSQL database that delivers single-digit millisecond performance at any scale. There's no server management, and it automatically scales capacity up and down. It's ideal for applications requiring consistent, high-speed access to key-value or document data.",
    service: "DynamoDB",
  },
  {
    id: 43,
    domain: 3,
    text: "Which AWS service is designed for Online Analytical Processing (OLAP) and running complex queries on petabytes of structured data in a data warehouse?",
    type: "single",
    options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon ElastiCache"],
    correct: [2],
    explanation:
      "Amazon Redshift is a cloud data warehouse service built for OLAP workloads — complex analytical queries across large datasets. It's not suited for OLTP (Online Transaction Processing). It uses columnar storage and parallel query execution to analyze petabytes of data efficiently.",
    service: "Redshift",
  },
  {
    id: 44,
    domain: 3,
    text: "A company wants to run queries on data stored in Amazon S3 without loading it into a database. Which service enables this?",
    type: "single",
    options: [
      "Amazon Redshift",
      "Amazon Athena",
      "Amazon EMR",
      "AWS Glue",
    ],
    correct: [1],
    explanation:
      "Amazon Athena is a serverless, interactive query service that lets you analyze data directly in Amazon S3 using standard SQL. You pay only per query (per TB of data scanned). There's no infrastructure to manage — ideal for ad-hoc analysis of S3 data lakes.",
    service: "Athena",
  },
  {
    id: 45,
    domain: 3,
    text: "Which AWS service allows you to run code without provisioning or managing servers, triggered by events like HTTP requests or file uploads?",
    type: "single",
    options: [
      "Amazon EC2",
      "AWS Elastic Beanstalk",
      "AWS Lambda",
      "Amazon ECS",
    ],
    correct: [2],
    explanation:
      "AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources. You pay only for the compute time consumed (per invocation and per GB-second). Lambda functions can run for up to 15 minutes.",
    service: "Lambda",
  },
  {
    id: 46,
    domain: 3,
    text: "Which AWS service provides a Platform as a Service (PaaS) for deploying web applications without managing the underlying infrastructure?",
    type: "single",
    options: [
      "Amazon EC2",
      "AWS Lambda",
      "AWS Elastic Beanstalk",
      "AWS CloudFormation",
    ],
    correct: [2],
    explanation:
      "AWS Elastic Beanstalk is a PaaS that handles deployment details (capacity provisioning, load balancing, auto-scaling, health monitoring) so developers focus on code. You upload your code and Elastic Beanstalk handles the rest. You still pay for the underlying resources used (EC2, RDS, etc.).",
    service: "Elastic Beanstalk",
  },
  {
    id: 47,
    domain: 3,
    text: "Which AWS service allows you to define infrastructure as code using templates (JSON/YAML) to provision and manage AWS resources?",
    type: "single",
    options: ["AWS CDK", "AWS CloudFormation", "AWS Systems Manager", "AWS OpsWorks"],
    correct: [1],
    explanation:
      "AWS CloudFormation is an Infrastructure as Code (IaC) service that allows you to model and provision AWS resources using templates in JSON or YAML. It creates, updates, and deletes resources as a 'stack,' enabling repeatable and version-controlled infrastructure provisioning.",
    service: "CloudFormation",
  },
  {
    id: 48,
    domain: 3,
    text: "What is the primary purpose of Amazon CloudFront?",
    type: "single",
    options: [
      "To provide dedicated network connections from on-premises to AWS",
      "To distribute content globally with low latency via a Content Delivery Network (CDN)",
      "To create virtual private networks in AWS",
      "To monitor AWS infrastructure performance",
    ],
    correct: [1],
    explanation:
      "Amazon CloudFront is AWS's CDN service. It distributes static and dynamic content to users from edge locations closest to them, reducing latency. CloudFront integrates with S3, EC2, Load Balancers, and can also improve the performance of API calls through caching and edge computing.",
    service: "CloudFront",
  },
  {
    id: 49,
    domain: 3,
    text: "A company needs to connect their on-premises data center to AWS with a consistent, dedicated network connection (not over the internet). Which service provides this?",
    type: "single",
    options: [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect",
      "AWS Transit Gateway",
      "Amazon VPC Peering",
    ],
    correct: [1],
    explanation:
      "AWS Direct Connect provides a dedicated private network connection from your on-premises environment to AWS — bypassing the public internet. This offers more consistent network performance, reduced bandwidth costs for high-volume transfers, and lower latency compared to internet-based connections.",
    service: "Direct Connect",
  },
  {
    id: 50,
    domain: 3,
    text: "Which AWS service is a global DNS web service that routes end-users to applications using policies like latency-based, geolocation, and failover routing?",
    type: "single",
    options: [
      "AWS Global Accelerator",
      "Amazon CloudFront",
      "Amazon Route 53",
      "AWS Transit Gateway",
    ],
    correct: [2],
    explanation:
      "Amazon Route 53 is a highly available and scalable DNS web service. It can route traffic based on various policies: Simple, Weighted, Latency-based, Failover, Geolocation, Geoproximity, and Multi-value. It can also perform health checks on your applications.",
    service: "Route 53",
  },
  {
    id: 51,
    domain: 3,
    text: "Which AWS service provides a fully managed message queuing service to decouple and scale microservices, distributed systems, and serverless applications?",
    type: "single",
    options: [
      "Amazon SNS",
      "Amazon SQS",
      "Amazon Kinesis",
      "Amazon MQ",
    ],
    correct: [1],
    explanation:
      "Amazon SQS (Simple Queue Service) is a fully managed message queuing service for decoupling application components. Messages are stored in the queue until they are processed and deleted. SQS supports Standard queues (best-effort ordering, at-least-once delivery) and FIFO queues (exactly-once processing, ordered).",
    service: "SQS",
  },
  {
    id: 52,
    domain: 3,
    text: "Which AWS service enables pub/sub messaging, allowing one message to be delivered to multiple subscribers including email, SMS, Lambda, SQS, and HTTP endpoints?",
    type: "single",
    options: ["Amazon SQS", "Amazon SNS", "Amazon Kinesis", "AWS EventBridge"],
    correct: [1],
    explanation:
      "Amazon SNS (Simple Notification Service) is a pub/sub messaging service. Publishers send messages to an SNS topic, and SNS fans out the message to all subscribers simultaneously. Subscribers can be email, SMS, mobile push, Lambda, SQS queues, HTTP/HTTPS endpoints, and more.",
    service: "SNS",
  },
  {
    id: 53,
    domain: 3,
    text: "A company is running a containerized application and wants to use AWS without managing the underlying EC2 infrastructure. Which services support this? (Select TWO)",
    type: "multi",
    options: [
      "Amazon EC2",
      "AWS Fargate",
      "Amazon EKS on Fargate",
      "AWS Lambda",
      "Amazon ECS with EC2 launch type",
    ],
    correct: [1, 2],
    explanation:
      "AWS Fargate is a serverless compute engine for containers that eliminates the need to manage EC2 servers. You can use Fargate with both ECS (Elastic Container Service) and EKS (Elastic Kubernetes Service). With EC2 launch type, you still manage the underlying EC2 instances.",
    service: "Fargate",
  },
  {
    id: 54,
    domain: 3,
    text: "What does Amazon CloudWatch primarily do?",
    type: "single",
    options: [
      "Provides log-based intrusion detection",
      "Monitors AWS resources and applications by collecting metrics, logs, and events",
      "Records all API calls made in your AWS account",
      "Tracks configuration changes to AWS resources",
    ],
    correct: [1],
    explanation:
      "Amazon CloudWatch is AWS's monitoring service. It collects and tracks metrics, collects and monitors log files, sets alarms, and automatically reacts to changes in your AWS resources. CloudWatch provides data and actionable insights to monitor applications, respond to system-wide performance changes, and optimize resource utilization.",
    service: "CloudWatch",
  },
  {
    id: 55,
    domain: 3,
    text: "Which AWS global infrastructure component consists of one or more discrete data centers with redundant power, networking, and connectivity in separate facilities?",
    type: "single",
    options: [
      "AWS Region",
      "Edge Location",
      "Availability Zone",
      "Local Zone",
    ],
    correct: [2],
    explanation:
      "An Availability Zone (AZ) consists of one or more discrete data centers with redundant power, networking, and connectivity, housed in separate facilities. Each AWS Region has a minimum of 3 AZs (typically 3-6). Deploying across multiple AZs provides high availability and fault tolerance.",
    service: "Global Infrastructure",
  },
  {
    id: 56,
    domain: 3,
    text: "Which of the following correctly describes an AWS Region?",
    type: "single",
    options: [
      "A single data center used for disaster recovery",
      "A geographic area containing multiple Availability Zones",
      "A network of edge servers used to cache content globally",
      "A dedicated connection between on-premises and AWS",
    ],
    correct: [1],
    explanation:
      "An AWS Region is a physical location in the world that contains multiple, isolated Availability Zones. AWS has 30+ regions globally. When choosing a region, consider compliance requirements, latency to end users, service availability, and pricing.",
    service: "Global Infrastructure",
  },
  {
    id: 57,
    domain: 3,
    text: "Which AWS service allows you to extend AWS infrastructure and services to your on-premises data center, supporting a hybrid cloud architecture?",
    type: "single",
    options: [
      "AWS Direct Connect",
      "AWS Outposts",
      "AWS Local Zones",
      "AWS Wavelength",
    ],
    correct: [1],
    explanation:
      "AWS Outposts brings AWS infrastructure, services, APIs, and tools to virtually any data center, co-location space, or on-premises facility. This is ideal for workloads that need to remain on-premises due to low latency requirements or data residency needs, while still using AWS services.",
    service: "Outposts",
  },
  {
    id: 58,
    domain: 3,
    text: "Which Amazon S3 feature enables faster uploads by routing data through the AWS edge network instead of the public internet?",
    type: "single",
    options: [
      "S3 Cross-Region Replication",
      "S3 Multipart Upload",
      "S3 Transfer Acceleration",
      "S3 Intelligent-Tiering",
    ],
    correct: [2],
    explanation:
      "S3 Transfer Acceleration speeds up content uploads to S3 by routing traffic through CloudFront edge locations and AWS's optimized network paths. It's particularly useful for uploading large files from distant locations. A compatibility tool can test whether Transfer Acceleration will benefit your use case.",
    service: "S3",
  },
  {
    id: 59,
    domain: 3,
    text: "Which AWS machine learning service can analyze images and videos to detect objects, people, text, scenes, and activities?",
    type: "single",
    options: ["Amazon Comprehend", "Amazon Rekognition", "Amazon Textract", "Amazon Polly"],
    correct: [1],
    explanation:
      "Amazon Rekognition is an AI/ML service for image and video analysis. It can identify objects, people, text, scenes, and activities in images and videos, and perform facial recognition. Common use cases include content moderation, media analysis, and identity verification.",
    service: "Rekognition",
  },
  {
    id: 60,
    domain: 3,
    text: "Which AWS service converts text to lifelike speech using deep learning?",
    type: "single",
    options: ["Amazon Transcribe", "Amazon Polly", "Amazon Lex", "Amazon Comprehend"],
    correct: [1],
    explanation:
      "Amazon Polly is a text-to-speech service that uses deep learning to synthesize speech that sounds like a human voice. It's used for building apps that talk, creating accessible content, and building voice applications.",
    service: "Polly",
  },
  {
    id: 61,
    domain: 3,
    text: "A company wants to migrate their on-premises database to AWS with minimal downtime. Which service facilitates this migration?",
    type: "single",
    options: [
      "AWS Schema Conversion Tool",
      "AWS Database Migration Service (DMS)",
      "AWS DataSync",
      "AWS Snow Family",
    ],
    correct: [1],
    explanation:
      "AWS Database Migration Service (DMS) helps migrate databases to AWS quickly and securely. The source database remains fully operational during migration, minimizing downtime. DMS supports homogeneous (same engine) and heterogeneous (different engine) migrations.",
    service: "DMS",
  },

  // ─── DOMAIN 4: Billing, Pricing & Support ────────────────────────────────────
  {
    id: 62,
    domain: 4,
    text: "Which AWS pricing model allows you to pay for compute capacity by the hour or second with no long-term commitments?",
    type: "single",
    options: [
      "Reserved Instances",
      "Savings Plans",
      "On-Demand pricing",
      "Spot pricing",
    ],
    correct: [2],
    explanation:
      "On-Demand pricing lets you pay for compute capacity by the hour or second (minimum 60 seconds) with no long-term commitments or upfront payments. You can increase or decrease capacity at any time and only pay for what you use. It's the most expensive per-unit but most flexible.",
    service: "EC2 Pricing",
  },
  {
    id: 63,
    domain: 4,
    text: "Which AWS tool helps estimate the cost of AWS services before you build?",
    type: "single",
    options: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator",
      "AWS Trusted Advisor",
    ],
    correct: [2],
    explanation:
      "The AWS Pricing Calculator allows you to explore AWS services and create an estimate for the cost of your use cases before you start using AWS. You can model your solutions, explore pricing, and calculate total cost. Cost Explorer shows historical costs, Budgets sets alerts.",
    service: "Pricing Calculator",
  },
  {
    id: 64,
    domain: 4,
    text: "Which AWS service lets you set custom alerts that notify you when your forecasted or actual AWS costs exceed your defined thresholds?",
    type: "single",
    options: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator",
      "AWS Cost and Usage Report",
    ],
    correct: [1],
    explanation:
      "AWS Budgets allows you to set custom budgets that alert you when costs or usage exceed (or are forecasted to exceed) your budgeted amount. You can set budgets for costs, usage, Reserved Instance utilization, and Savings Plans. Alerts can be sent via email or SNS.",
    service: "Budgets",
  },
  {
    id: 65,
    domain: 4,
    text: "A company wants to visualize, understand, and manage their AWS costs and usage over time with graphs and reports. Which service provides this?",
    type: "single",
    options: [
      "AWS Budgets",
      "AWS Cost Explorer",
      "AWS Trusted Advisor",
      "AWS Organizations",
    ],
    correct: [1],
    explanation:
      "AWS Cost Explorer provides an interface to visualize and analyze your AWS costs and usage over time. You can view data for up to the last 12 months, forecast your likely spend for the next 3 months, and get recommendations for Reserved Instances or Savings Plans based on your usage history.",
    service: "Cost Explorer",
  },
  {
    id: 66,
    domain: 4,
    text: "Which AWS Support plan is the minimum plan that provides 24/7 phone, email, and chat access to technical support engineers?",
    type: "single",
    options: ["Basic", "Developer", "Business", "Enterprise"],
    correct: [2],
    explanation:
      "The Business Support plan is the minimum level that provides 24/7 phone, email, and chat access to Cloud Support Engineers. Developer provides email access during business hours only. Basic provides no technical support. Enterprise adds a dedicated Technical Account Manager (TAM).",
    service: "Support Plans",
  },
  {
    id: 67,
    domain: 4,
    text: "Which AWS feature allows multiple AWS accounts to be managed centrally and share the benefits of volume pricing through a single payment method?",
    type: "single",
    options: [
      "AWS Control Tower",
      "AWS Organizations — Consolidated Billing",
      "AWS IAM Identity Center",
      "AWS Service Catalog",
    ],
    correct: [1],
    explanation:
      "AWS Organizations with Consolidated Billing combines the usage across all accounts in the organization to share volume pricing discounts and Reserved Instance discounts. All charges are consolidated into a single payment method on the master/management account.",
    service: "Organizations",
  },
  {
    id: 68,
    domain: 4,
    text: "Which of the following AWS services are completely free to use? (Select TWO)",
    type: "multi",
    options: [
      "Amazon EC2",
      "AWS IAM",
      "Amazon S3",
      "Amazon VPC",
      "Amazon RDS",
    ],
    correct: [1, 3],
    explanation:
      "AWS IAM is completely free — there is no charge for creating users, groups, roles, or policies. Amazon VPC itself is free — you only pay for optional features like NAT Gateways, VPN connections, or Direct Connect. EC2, S3, and RDS all have usage-based charges.",
    service: "Free Services",
  },
  {
    id: 69,
    domain: 4,
    text: "What is the main purpose of AWS Savings Plans?",
    type: "single",
    options: [
      "Automatically terminate idle resources",
      "Provide flexible pricing in exchange for a commitment to a consistent amount of compute usage (measured in $/hour) for 1 or 3 years",
      "Reserve capacity for EC2 in specific Availability Zones",
      "Provide automatic rightsizing recommendations for EC2",
    ],
    correct: [1],
    explanation:
      "Savings Plans offer savings of up to 66-72% over On-Demand pricing in exchange for committing to a consistent amount of compute usage ($X/hour) for 1 or 3 years. Unlike Reserved Instances, Savings Plans are more flexible — they automatically apply to EC2, Fargate, and Lambda usage regardless of region, instance family, or OS.",
    service: "Savings Plans",
  },
  {
    id: 70,
    domain: 4,
    text: "Which AWS service provides automated recommendations to help you reduce costs, improve performance, enhance security, and increase fault tolerance?",
    type: "single",
    options: [
      "AWS Cost Explorer",
      "Amazon Inspector",
      "AWS Trusted Advisor",
      "AWS Compute Optimizer",
    ],
    correct: [2],
    explanation:
      "AWS Trusted Advisor is an online tool that provides real-time guidance across five categories: Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits. The number of checks available depends on your Support plan (Basic/Developer see limited checks; Business/Enterprise see all checks).",
    service: "Trusted Advisor",
  },
  {
    id: 71,
    domain: 4,
    text: "Under the AWS Free Tier, which of the following is available for 12 months after account creation?",
    type: "single",
    options: [
      "750 hours/month of t2.micro EC2 instance",
      "Unlimited Lambda invocations",
      "1TB of S3 storage",
      "Unlimited CloudWatch metrics",
    ],
    correct: [0],
    explanation:
      "The AWS Free Tier offers 750 hours/month of t2.micro (or t3.micro in regions where t2.micro is not available) EC2 instances for 12 months after account sign-up. Lambda's free tier (1 million requests/month) is Always Free. S3 offers 5GB of standard storage free for 12 months.",
    service: "Free Tier",
  },
  {
    id: 72,
    domain: 4,
    text: "Which AWS Support plan includes a designated Technical Account Manager (TAM) and proactive guidance?",
    type: "single",
    options: ["Basic", "Developer", "Business", "Enterprise"],
    correct: [3],
    explanation:
      "The Enterprise Support plan includes a designated Technical Account Manager (TAM) who provides proactive guidance, helps develop and execute AWS best practices, and acts as a single point of contact for all AWS needs. Enterprise also includes Concierge Support and Infrastructure Event Management.",
    service: "Support Plans",
  },
  {
    id: 73,
    domain: 4,
    text: "Which cost management tool helps identify over-provisioned EC2 instances and recommends optimal instance types based on actual usage data?",
    type: "single",
    options: [
      "AWS Trusted Advisor",
      "AWS Cost Explorer",
      "AWS Compute Optimizer",
      "AWS Budgets",
    ],
    correct: [2],
    explanation:
      "AWS Compute Optimizer uses machine learning to analyze utilization metrics and recommends optimal AWS compute resources (EC2 instance types, Auto Scaling Groups, Lambda functions, EBS volumes). It identifies over-provisioned or under-provisioned resources to reduce costs and improve performance.",
    service: "Compute Optimizer",
  },
  {
    id: 74,
    domain: 4,
    text: "Which tool provides the most detailed and comprehensive data about your AWS costs and usage, and can be loaded into Athena or Redshift for advanced analysis?",
    type: "single",
    options: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Cost and Usage Report (CUR)",
      "AWS Trusted Advisor",
    ],
    correct: [2],
    explanation:
      "The AWS Cost and Usage Report (CUR) is the most comprehensive dataset of AWS costs and usage, available for delivery to S3. It includes hourly line-item data for every AWS service used. It can be analyzed with Amazon Athena, Amazon Redshift, or visualized in Amazon QuickSight.",
    service: "Cost and Usage Report",
  },
  {
    id: 75,
    domain: 4,
    text: "Which of the following factors affect the cost of data transfer in AWS? (Select TWO)",
    type: "multi",
    options: [
      "Data transferred between services in the same Availability Zone",
      "Data transferred out from AWS to the internet",
      "Data transferred within the same AWS Region between services",
      "Data transferred between AWS Regions",
      "Data uploaded to Amazon S3",
    ],
    correct: [1, 3],
    explanation:
      "Data transfer OUT from AWS to the internet incurs a cost (first GB/month free, then tiered pricing). Data transfer between AWS Regions also incurs a charge. Data transfer IN to AWS is free. Data transfer between services in the same AZ is typically free. Uploading (ingress) to S3 is free.",
    service: "Pricing",
  },

  // Additional domain 2 and 3 questions for variety
  {
    id: 76,
    domain: 2,
    text: "Which IAM feature can be used to generate a report that lists all IAM users in an account and the status of their credentials (passwords, access keys, MFA)?",
    type: "single",
    options: [
      "IAM Access Analyzer",
      "IAM Credentials Report",
      "IAM Policy Simulator",
      "IAM Access Advisor",
    ],
    correct: [1],
    explanation:
      "The IAM Credentials Report is an account-level report that lists all IAM users and the status of their various credentials including passwords, access keys, and MFA devices. It can be downloaded from the IAM console and is useful for auditing credential compliance.",
    service: "IAM",
  },
  {
    id: 77,
    domain: 3,
    text: "Which AWS service provides a fully managed CI/CD pipeline for automating the build, test, and deploy phases of application releases?",
    type: "single",
    options: ["AWS CodeBuild", "AWS CodeDeploy", "AWS CodePipeline", "AWS CodeCommit"],
    correct: [2],
    explanation:
      "AWS CodePipeline is a fully managed continuous delivery service that automates the build, test, and deploy phases of your release process. It integrates with CodeCommit (source), CodeBuild (build), and CodeDeploy (deploy), as well as third-party tools like GitHub and Jenkins.",
    service: "CodePipeline",
  },
  {
    id: 78,
    domain: 3,
    text: "Which AWS storage service is designed specifically for Windows-based applications requiring shared file storage with native SMB protocol support?",
    type: "single",
    options: [
      "Amazon EFS",
      "Amazon EBS",
      "Amazon FSx for Windows File Server",
      "Amazon S3",
    ],
    correct: [2],
    explanation:
      "Amazon FSx for Windows File Server provides fully managed, highly reliable native Windows shared file storage built on Windows Server. It supports the SMB protocol and Windows NTFS, Active Directory integration, and access control lists (ACLs). EFS supports NFS and is for Linux workloads.",
    service: "FSx",
  },
  {
    id: 79,
    domain: 1,
    text: "Which of the following statements about AWS Global Infrastructure is correct?",
    type: "single",
    options: [
      "Each AWS Region has exactly one Availability Zone",
      "Availability Zones within a Region are connected with high-bandwidth, low-latency networking",
      "Edge Locations are the same as Availability Zones",
      "AWS has fewer Regions than Availability Zones total",
    ],
    correct: [1],
    explanation:
      "Availability Zones within a Region are connected through dedicated high-bandwidth, low-latency fiber networking, enabling synchronous replication and high availability between AZs. AWS has 30+ Regions, each with 2-6 AZs, and 400+ edge locations — far more edge locations than AZs or Regions.",
    service: "Global Infrastructure",
  },
  {
    id: 80,
    domain: 3,
    text: "Which AWS service provides real-time streaming data ingestion and processing for applications like clickstream analysis, IoT telemetry, and log analytics?",
    type: "single",
    options: ["Amazon SQS", "Amazon SNS", "Amazon Kinesis", "Amazon MQ"],
    correct: [2],
    explanation:
      "Amazon Kinesis is a suite of services for real-time streaming data. Kinesis Data Streams captures and processes large streams of data records in real-time. Kinesis Data Firehose loads streaming data into data stores. Kinesis Data Analytics processes streaming data with SQL or Apache Flink.",
    service: "Kinesis",
  },
  {
    id: 81,
    domain: 2,
    text: "What is the purpose of an IAM policy?",
    type: "single",
    options: [
      "To provide temporary credentials to AWS services",
      "To define permissions that specify what actions are allowed or denied on which resources",
      "To group IAM users together for easier management",
      "To configure multi-factor authentication for users",
    ],
    correct: [1],
    explanation:
      "IAM policies are JSON documents that define permissions — they specify what actions are allowed or denied on which AWS resources under what conditions. Policies are attached to IAM identities (users, groups, roles) or resources. AWS evaluates policies when a principal makes a request.",
    service: "IAM",
  },
  {
    id: 82,
    domain: 3,
    text: "Which service provides a managed, enterprise-grade message broker service supporting protocols like AMQP, MQTT, and STOMP — for migrating existing applications that use traditional brokers like ActiveMQ and RabbitMQ?",
    type: "single",
    options: ["Amazon SQS", "Amazon SNS", "Amazon MQ", "Amazon Kinesis"],
    correct: [2],
    explanation:
      "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ. It's designed for migrations of existing applications that already use open-standard messaging protocols (AMQP, MQTT, STOMP, OpenWire). New applications should use SQS/SNS as they are more scalable and cloud-native.",
    service: "Amazon MQ",
  },
  {
    id: 83,
    domain: 4,
    text: "Which of the following is NOT a valid AWS Support plan?",
    type: "single",
    options: ["Basic", "Developer", "Startup", "Business"],
    correct: [2],
    explanation:
      "AWS offers five support plans: Basic (free), Developer, Business, Enterprise On-Ramp, and Enterprise. There is no 'Startup' support plan. Basic provides limited support with no technical support access. Developer provides email support during business hours.",
    service: "Support Plans",
  },
  {
    id: 84,
    domain: 3,
    text: "A company needs to migrate 80TB of data to AWS. Their internet connection is too slow to make this practical. Which service enables physical data transfer?",
    type: "single",
    options: [
      "AWS DataSync",
      "AWS Storage Gateway",
      "AWS Snowball Edge",
      "AWS Direct Connect",
    ],
    correct: [2],
    explanation:
      "AWS Snowball Edge is a physical device shipped to you so you can load your data on-premises, then ship it back to AWS for ingestion into S3. It can hold 80-210TB of data. For multi-petabyte transfers, Snowmobile (a 45-foot truck) is used. Snowcone is for smaller, up to 8TB.",
    service: "Snow Family",
  },
  {
    id: 85,
    domain: 2,
    text: "Which service provides a single pane of glass view of security alerts and compliance status across multiple AWS accounts?",
    type: "single",
    options: ["Amazon GuardDuty", "AWS Security Hub", "Amazon Inspector", "AWS Config"],
    correct: [1],
    explanation:
      "AWS Security Hub provides a comprehensive view of your security posture in AWS by aggregating, organizing, and prioritizing security alerts (findings) from multiple AWS services including GuardDuty, Inspector, Macie, and partner products into a single dashboard.",
    service: "Security Hub",
  },
  {
    id: 86,
    domain: 3,
    text: "Which of the following services can be used to improve read performance of a relational database by caching frequently-queried results in memory?",
    type: "single",
    options: ["Amazon RDS Multi-AZ", "Amazon ElastiCache", "Amazon DynamoDB DAX", "Amazon Redshift"],
    correct: [1],
    explanation:
      "Amazon ElastiCache provides in-memory caching using Redis or Memcached. It sits in front of a database to cache the results of frequent database queries, reducing the load on the DB and delivering sub-millisecond latency. DynamoDB DAX is similar but specific to DynamoDB.",
    service: "ElastiCache",
  },
  {
    id: 87,
    domain: 3,
    text: "Which AWS service provides a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service, with no administration?",
    type: "single",
    options: ["Amazon ECS", "AWS Fargate", "AWS Lambda", "AWS Batch"],
    correct: [2],
    explanation:
      "AWS Lambda is the core serverless compute service. You upload your code, define a trigger (API Gateway, S3 event, DynamoDB stream, schedule, etc.), and Lambda handles everything else: execution environment, scaling, availability. You pay only when your code runs.",
    service: "Lambda",
  },
  {
    id: 88,
    domain: 2,
    text: "According to the AWS Shared Responsibility Model, which of the following is the customer's responsibility when using Amazon S3?",
    type: "single",
    options: [
      "Ensuring S3 hardware is physically secure",
      "Patching the S3 service software",
      "Managing bucket policies and object access control",
      "Maintaining the underlying S3 network infrastructure",
    ],
    correct: [2],
    explanation:
      "For S3, AWS manages physical security, hardware, and the S3 service software. The customer is responsible for managing access controls — bucket policies, ACLs, public access settings, object-level permissions, and encryption configuration. Customer data security is always the customer's responsibility.",
    service: "Shared Responsibility Model",
  },
  {
    id: 89,
    domain: 1,
    text: "Which of the following describes the 'economies of scale' advantage of cloud computing?",
    type: "single",
    options: [
      "You can deploy applications to multiple regions globally",
      "AWS's aggregated usage from hundreds of thousands of customers results in lower pay-as-you-go prices",
      "You can instantly provision any amount of resources",
      "You don't need to manage physical hardware",
    ],
    correct: [1],
    explanation:
      "Economies of scale means that because AWS serves hundreds of thousands of customers, they achieve higher economies of scale, which translates into lower pay-as-you-go prices over time. AWS passes these cost savings on to customers through regular price reductions.",
    service: "Cloud Concepts",
  },
  {
    id: 90,
    domain: 4,
    text: "Which AWS service is used to set up and govern a secure, multi-account AWS environment based on AWS best practices?",
    type: "single",
    options: [
      "AWS Organizations",
      "AWS Control Tower",
      "AWS Service Catalog",
      "AWS Config",
    ],
    correct: [1],
    explanation:
      "AWS Control Tower automates the setup of a baseline environment (landing zone) across multiple AWS accounts following AWS best practices. It uses AWS Organizations, Service Control Policies, CloudTrail, Config, and IAM Identity Center to provide governance guardrails.",
    service: "Control Tower",
  },
];
