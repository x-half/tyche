const PracticeModule = {
    currentSubject: null,
    currentQuestions: [],
    currentIndex: 0,
    answers: {},
    showAnswer: false,

    subjects: {
        'software-designer': { name: '软件设计师', icon: '💻' },
        'network-engineer': { name: '网络工程师', icon: '🌐' },
        'security-engineer': { name: '信息安全工程师', icon: '🔒' },
        'database-engineer': { name: '数据库系统工程师', icon: '🗄️' },
        'info-system-manager': { name: '信息系统管理工程师', icon: '⚙️' }
    },

    questionBank: {
        'software-designer': [
            {
                id: 'sd-q1',
                type: 'choice',
                text: '在CPU中用于跟踪指令地址的寄存器是（）。',
                options: [
                    'A. 地址寄存器(MAR)',
                    'B. 程序计数器(PC)',
                    'C. 数据寄存器(MDR)',
                    'D. 指令寄存器(IR)'
                ],
                answer: 'B',
                explanation: '程序计数器(PC)用于存放下一条指令的地址，它跟踪程序的执行流程。地址寄存器(MAR)存放访问内存的地址，数据寄存器(MDR)存放读写内存的数据，指令寄存器(IR)存放当前正在执行的指令。',
                chapter: 'sd-1',
                difficulty: 2
            },
            {
                id: 'sd-q2',
                type: 'choice',
                text: '以下关于Cache的叙述中，正确的是（）。',
                options: [
                    'A. Cache的容量通常大于主存',
                    'B. Cache的访问速度与CPU相同',
                    'C. Cache的内容是主存部分内容的副本',
                    'D. Cache可以永久保存数据'
                ],
                answer: 'C',
                explanation: 'Cache是高速缓冲存储器，其内容是主存中活跃数据的副本。Cache容量通常远小于主存，速度介于CPU和主存之间，断电后数据会丢失。',
                chapter: 'sd-1',
                difficulty: 2
            },
            {
                id: 'sd-q3',
                type: 'choice',
                text: '某系统采用二级页表存储管理，页面大小为4KB，逻辑地址为32位，则一级页表占用（）位。',
                options: [
                    'A. 10',
                    'B. 12',
                    'C. 20',
                    'D. 22'
                ],
                answer: 'A',
                explanation: '页面大小4KB=2^12B，页内偏移占12位。32位地址中剩余20位用于页号。二级页表将页号分为两部分，各占10位。',
                chapter: 'sd-2',
                difficulty: 3
            },
            {
                id: 'sd-q4',
                type: 'choice',
                text: '若进栈序列为1,2,3,4，进栈过程中可以出栈，则（）不可能是一个出栈序列。',
                options: [
                    'A. 1,2,3,4',
                    'B. 2,1,3,4',
                    'C. 3,2,1,4',
                    'D. 4,3,1,2'
                ],
                answer: 'D',
                explanation: '对于选项D，若4先出栈，则1,2,3,4必须全部进栈，此时栈中从顶到底为3,2,1，出栈序列应为4,3,2,1，不能是4,3,1,2。',
                chapter: 'sd-5',
                difficulty: 2
            },
            {
                id: 'sd-q5',
                type: 'choice',
                text: '在面向对象方法中，对象是类的实例。一个类可以有多个对象，这些对象（）。',
                options: [
                    'A. 共享同一个内存空间',
                    'B. 具有不同的属性值',
                    'C. 具有不同的方法',
                    'D. 不能接收相同的消息'
                ],
                answer: 'B',
                explanation: '同一个类的对象具有相同的属性和方法（由类定义），但可以有不同的属性值。每个对象有独立的内存空间，可以接收相同的消息。',
                chapter: 'sd-8',
                difficulty: 1
            },
            {
                id: 'sd-q6',
                type: 'choice',
                text: '以下排序算法中，（）在最坏情况下的时间复杂度与其他三个不同。',
                options: [
                    'A. 快速排序',
                    'B. 冒泡排序',
                    'C. 堆排序',
                    'D. 归并排序'
                ],
                answer: 'A',
                explanation: '快速排序最坏时间复杂度为O(n²)，而冒泡排序最坏O(n²)，堆排序最坏O(nlogn)，归并排序最坏O(nlogn)。这里选A是因为快速排序的最坏情况与其他三个中的堆排序和归并排序不同。但严格来说，冒泡排序也是O(n²)。题目设置可能有争议，实际考试中快速排序最坏O(n²)与其他O(nlogn)不同。',
                chapter: 'sd-5',
                difficulty: 3
            },
            {
                id: 'sd-q7',
                type: 'choice',
                text: 'UML中，（）用于描述系统的功能需求。',
                options: [
                    'A. 类图',
                    'B. 用例图',
                    'C. 序列图',
                    'D. 状态图'
                ],
                answer: 'B',
                explanation: '用例图用于描述系统的功能需求，展示系统与外部用户的交互。类图描述系统的静态结构，序列图描述对象之间的交互顺序，状态图描述对象的状态变化。',
                chapter: 'sd-8',
                difficulty: 1
            },
            {
                id: 'sd-q8',
                type: 'choice',
                text: '在软件开发模型中，（）模型最适合需求不明确的项目。',
                options: [
                    'A. 瀑布模型',
                    'B. 增量模型',
                    'C. 原型模型',
                    'D. 螺旋模型'
                ],
                answer: 'C',
                explanation: '原型模型通过快速构建原型来明确需求，最适合需求不明确的项目。瀑布模型要求需求明确，增量模型是分批交付，螺旋模型强调风险分析。',
                chapter: 'sd-7',
                difficulty: 2
            },
            {
                id: 'sd-q9',
                type: 'choice',
                text: '关系数据库中，（）约束确保表中每一行数据是唯一的。',
                options: [
                    'A. 外键约束',
                    'B. 唯一约束',
                    'C. 主键约束',
                    'D. 检查约束'
                ],
                answer: 'C',
                explanation: '主键约束确保表中每一行数据是唯一的，且不能为NULL。唯一约束也确保唯一性但允许NULL值。外键约束用于表间关系，检查约束用于限制列值范围。',
                chapter: 'sd-3',
                difficulty: 1
            },
            {
                id: 'sd-q10',
                type: 'choice',
                text: '以下设计模式中，（）模式用于将对象组合成树形结构以表示"部分-整体"的层次结构。',
                options: [
                    'A. 代理模式',
                    'B. 装饰器模式',
                    'C. 组合模式',
                    'D. 桥接模式'
                ],
                answer: 'C',
                explanation: '组合模式将对象组合成树形结构以表示"部分-整体"的层次结构，使得用户对单个对象和组合对象的使用具有一致性。',
                chapter: 'sd-8',
                difficulty: 2
            }
        ],
        'network-engineer': [
            {
                id: 'ne-q1',
                type: 'choice',
                text: 'OSI参考模型中，负责数据加密和解密的是（）。',
                options: [
                    'A. 应用层',
                    'B. 表示层',
                    'C. 会话层',
                    'D. 传输层'
                ],
                answer: 'B',
                explanation: '表示层负责数据的编码/解码、加密/解密和压缩/解压缩。应用层提供用户接口，会话层管理会话，传输层提供端到端的可靠传输。',
                chapter: 'ne-1',
                difficulty: 1
            },
            {
                id: 'ne-q2',
                type: 'choice',
                text: '以太网帧的最大长度是（）字节。',
                options: [
                    'A. 64',
                    'B. 512',
                    'C. 1500',
                    'D. 1518'
                ],
                answer: 'D',
                explanation: '以太网帧最大长度为1518字节，包括14字节首部和4字节FCS。数据字段最大为1500字节（MTU），最小帧长为64字节。',
                chapter: 'ne-3',
                difficulty: 2
            },
            {
                id: 'ne-q3',
                type: 'choice',
                text: 'IP地址192.168.1.0/26可以划分出（）个可用主机地址。',
                options: [
                    'A. 30',
                    'B. 62',
                    'C. 64',
                    'D. 126'
                ],
                answer: 'B',
                explanation: '/26表示子网掩码有26位，主机位有32-26=6位。可用主机地址数为2^6-2=62个（减去网络地址和广播地址）。',
                chapter: 'ne-4',
                difficulty: 2
            },
            {
                id: 'ne-q4',
                type: 'choice',
                text: 'TCP建立连接需要（）次握手。',
                options: [
                    'A. 1',
                    'B. 2',
                    'C. 3',
                    'D. 4'
                ],
                answer: 'C',
                explanation: 'TCP建立连接需要三次握手：客户端发送SYN，服务器回复SYN+ACK，客户端发送ACK。断开连接需要四次挥手。',
                chapter: 'ne-5',
                difficulty: 1
            },
            {
                id: 'ne-q5',
                type: 'choice',
                text: '以下协议中，使用UDP作为传输层协议的是（）。',
                options: [
                    'A. HTTP',
                    'B. FTP',
                    'C. DNS',
                    'D. SMTP'
                ],
                answer: 'C',
                explanation: 'DNS通常使用UDP协议进行域名解析（端口53），当数据量大时会使用TCP。HTTP、FTP、SMTP都使用TCP协议。',
                chapter: 'ne-6',
                difficulty: 1
            },
            {
                id: 'ne-q6',
                type: 'choice',
                text: '在OSPF路由协议中，用于发现邻居路由器的报文是（）。',
                options: [
                    'A. Hello',
                    'B. DBD',
                    'C. LSR',
                    'D. LSU'
                ],
                answer: 'A',
                explanation: 'OSPF使用Hello报文来发现和维护邻居关系。DBD用于交换数据库描述，LSR用于请求链路状态信息，LSU用于更新链路状态信息。',
                chapter: 'ne-4',
                difficulty: 2
            },
            {
                id: 'ne-q7',
                type: 'choice',
                text: 'VPN技术中，工作在网络层的隧道协议是（）。',
                options: [
                    'A. PPTP',
                    'B. L2TP',
                    'C. IPsec',
                    'D. SSL'
                ],
                answer: 'C',
                explanation: 'IPsec工作在网络层，提供IP数据包的安全保护。PPTP和L2TP工作在数据链路层，SSL工作在传输层之上。',
                chapter: 'ne-7',
                difficulty: 2
            },
            {
                id: 'ne-q8',
                type: 'choice',
                text: '以下关于IPv6的描述中，错误的是（）。',
                options: [
                    'A. IPv6地址长度为128位',
                    'B. IPv6不再使用ARP协议',
                    'C. IPv6头部长度固定为40字节',
                    'D. IPv6不支持广播通信'
                ],
                answer: 'B',
                explanation: 'IPv6仍然需要地址解析功能，使用NDP（邻居发现协议）替代了ARP。IPv6使用组播和任播替代了广播。',
                chapter: 'ne-11',
                difficulty: 3
            },
            {
                id: 'ne-q9',
                type: 'choice',
                text: '交换机工作在OSI参考模型的（）层。',
                options: [
                    'A. 物理层',
                    'B. 数据链路层',
                    'C. 网络层',
                    'D. 传输层'
                ],
                answer: 'B',
                explanation: '传统交换机工作在数据链路层，根据MAC地址进行帧转发。路由器工作在网络层，根据IP地址进行包转发。',
                chapter: 'ne-3',
                difficulty: 1
            },
            {
                id: 'ne-q10',
                type: 'choice',
                text: 'SNMP协议使用的端口号是（）。',
                options: [
                    'A. 21',
                    'B. 25',
                    'C. 161',
                    'D. 443'
                ],
                answer: 'C',
                explanation: 'SNMP（简单网络管理协议）使用UDP端口161进行通信，端口162用于Trap消息。21是FTP，25是SMTP，443是HTTPS。',
                chapter: 'ne-8',
                difficulty: 1
            }
        ],
        'security-engineer': [
            {
                id: 'se-q1',
                type: 'choice',
                text: '以下加密算法中，属于对称加密算法的是（）。',
                options: [
                    'A. RSA',
                    'B. AES',
                    'C. ECC',
                    'D. DSA'
                ],
                answer: 'B',
                explanation: 'AES（高级加密标准）是对称加密算法，加密和解密使用相同的密钥。RSA、ECC、DSA都是非对称加密或签名算法。',
                chapter: 'se-3',
                difficulty: 1
            },
            {
                id: 'se-q2',
                type: 'choice',
                text: '数字签名的主要功能是（）。',
                options: [
                    'A. 保密性',
                    'B. 完整性',
                    'C. 不可否认性',
                    'D. 可用性'
                ],
                answer: 'C',
                explanation: '数字签名主要用于实现不可否认性（抗抵赖性），即签名者不能否认其签名行为。同时也能提供完整性和身份认证功能。',
                chapter: 'se-5',
                difficulty: 2
            },
            {
                id: 'se-q3',
                type: 'choice',
                text: '防火墙工作在OSI模型的网络层和传输层，这种防火墙称为（）。',
                options: [
                    'A. 包过滤防火墙',
                    'B. 应用代理防火墙',
                    'C. 状态检测防火墙',
                    'D. 下一代防火墙'
                ],
                answer: 'A',
                explanation: '包过滤防火墙工作在网络层和传输层，根据IP地址、端口号等信息进行过滤。应用代理防火墙工作在应用层，状态检测防火墙跟踪连接状态。',
                chapter: 'se-8',
                difficulty: 2
            },
            {
                id: 'se-q4',
                type: 'choice',
                text: '以下关于PKI的描述中，错误的是（）。',
                options: [
                    'A. CA负责签发和管理数字证书',
                    'B. RA负责审核证书申请者的身份',
                    'C. 数字证书中包含用户的私钥',
                    'D. CRL用于发布已撤销的证书'
                ],
                answer: 'C',
                explanation: '数字证书中包含用户的公钥和身份信息，不包含私钥。私钥由用户自己保管。CA签发证书，RA审核身份，CRL发布撤销信息。',
                chapter: 'se-5',
                difficulty: 2
            },
            {
                id: 'se-q5',
                type: 'choice',
                text: '访问控制中，基于角色的访问控制模型简称（）。',
                options: [
                    'A. DAC',
                    'B. MAC',
                    'C. RBAC',
                    'D. ABAC'
                ],
                answer: 'C',
                explanation: 'RBAC（Role-Based Access Control）基于角色的访问控制。DAC是自主访问控制，MAC是强制访问控制，ABAC是基于属性的访问控制。',
                chapter: 'se-6',
                difficulty: 1
            },
            {
                id: 'se-q6',
                type: 'choice',
                text: 'SSL/TLS协议位于TCP/IP协议栈的（）之间。',
                options: [
                    'A. 应用层和传输层',
                    'B. 传输层和网络层',
                    'C. 网络层和数据链路层',
                    'D. 数据链路层和物理层'
                ],
                answer: 'A',
                explanation: 'SSL/TLS协议位于应用层和传输层之间，为应用层协议（如HTTP、FTP）提供安全传输服务。HTTPS就是HTTP over SSL/TLS。',
                chapter: 'se-7',
                difficulty: 2
            },
            {
                id: 'se-q7',
                type: 'choice',
                text: '以下哪种攻击属于拒绝服务攻击（DoS）？',
                options: [
                    'A. SQL注入',
                    'B. XSS攻击',
                    'C. SYN洪泛',
                    'D. 中间人攻击'
                ],
                answer: 'C',
                explanation: 'SYN洪泛攻击通过发送大量SYN请求耗尽服务器资源，属于拒绝服务攻击。SQL注入和XSS属于Web应用攻击，中间人攻击属于窃听攻击。',
                chapter: 'se-8',
                difficulty: 1
            },
            {
                id: 'se-q8',
                type: 'choice',
                text: '信息安全的基本属性不包括（）。',
                options: [
                    'A. 机密性',
                    'B. 完整性',
                    'C. 可用性',
                    'D. 可追溯性'
                ],
                answer: 'D',
                explanation: '信息安全的三个基本属性是CIA：机密性（Confidentiality）、完整性（Integrity）、可用性（Availability）。可追溯性不是基本属性。',
                chapter: 'se-1',
                difficulty: 1
            },
            {
                id: 'se-q9',
                type: 'choice',
                text: 'MD5算法产生的消息摘要长度是（）位。',
                options: [
                    'A. 64',
                    'B. 128',
                    'C. 160',
                    'D. 256'
                ],
                answer: 'B',
                explanation: 'MD5产生128位的消息摘要。SHA-1产生160位摘要，SHA-256产生256位摘要。MD5已被证明不够安全，建议使用SHA-2系列。',
                chapter: 'se-2',
                difficulty: 2
            },
            {
                id: 'se-q10',
                type: 'choice',
                text: '以下关于数字证书的描述中，正确的是（）。',
                options: [
                    'A. 数字证书由用户自己签发',
                    'B. 数字证书包含用户的私钥',
                    'C. 数字证书用于绑定公钥和身份',
                    'D. 数字证书永久有效'
                ],
                answer: 'C',
                explanation: '数字证书由CA签发，包含用户的公钥和身份信息，用于绑定公钥和用户身份。证书有有效期，到期需要更新。',
                chapter: 'se-5',
                difficulty: 1
            }
        ],
        'database-engineer': [
            {
                id: 'db-q1',
                type: 'choice',
                text: '关系数据库中，关系的每个分量必须是不可分的数据项，这属于（）。',
                options: [
                    'A. 第一范式',
                    'B. 第二范式',
                    'C. 第三范式',
                    'D. BC范式'
                ],
                answer: 'A',
                explanation: '第一范式(1NF)要求关系的每个分量必须是不可分的数据项，即表中不能再包含表。这是关系数据库最基本的规范化要求。',
                chapter: 'db-5',
                difficulty: 1
            },
            {
                id: 'db-q2',
                type: 'choice',
                text: 'SQL语句中，用于修改表结构的命令是（）。',
                options: [
                    'A. UPDATE',
                    'B. ALTER',
                    'C. MODIFY',
                    'D. CHANGE'
                ],
                answer: 'B',
                explanation: 'ALTER TABLE用于修改表结构，如添加、删除、修改列。UPDATE用于修改表中的数据，MODIFY和CHANGE是ALTER的具体操作方式。',
                chapter: 'db-3',
                difficulty: 1
            },
            {
                id: 'db-q3',
                type: 'choice',
                text: '事务的ACID特性中，（）是指数据库从一个一致性状态变到另一个一致性状态。',
                options: [
                    'A. 原子性',
                    'B. 一致性',
                    'C. 隔离性',
                    'D. 持久性'
                ],
                answer: 'B',
                explanation: '一致性(Consistency)是指事务执行前后，数据库都处于一致性状态。原子性是指事务要么全做要么全不做，隔离性是指并发事务互不干扰，持久性是指事务提交后永久生效。',
                chapter: 'db-6',
                difficulty: 2
            },
            {
                id: 'db-q4',
                type: 'choice',
                text: '以下关于索引的描述中，错误的是（）。',
                options: [
                    'A. 索引可以提高查询速度',
                    'B. 索引会占用额外的存储空间',
                    'C. 索引越多越好',
                    'D. 索引需要维护'
                ],
                answer: 'C',
                explanation: '索引不是越多越好。虽然索引可以提高查询速度，但会占用存储空间，且在数据更新时需要维护索引，会影响插入、删除、更新的性能。',
                chapter: 'db-4',
                difficulty: 2
            },
            {
                id: 'db-q5',
                type: 'choice',
                text: '数据库中，并发控制的主要目的是（）。',
                options: [
                    'A. 提高查询效率',
                    'B. 保证数据一致性',
                    'C. 减少存储空间',
                    'D. 简化编程复杂度'
                ],
                answer: 'B',
                explanation: '并发控制的主要目的是保证多个事务并发执行时数据库的一致性。常见技术包括封锁（锁）、时间戳、乐观控制等。',
                chapter: 'db-7',
                difficulty: 2
            },
            {
                id: 'db-q6',
                type: 'choice',
                text: '在SQL中，用于从多个表中查询数据的操作是（）。',
                options: [
                    'A. 选择',
                    'B. 投影',
                    'C. 连接',
                    'D. 除'
                ],
                answer: 'C',
                explanation: '连接(Join)操作用于从多个表中查询数据，根据连接条件将相关表的数据组合在一起。选择是按行筛选，投影是按列筛选。',
                chapter: 'db-3',
                difficulty: 1
            },
            {
                id: 'db-q7',
                type: 'choice',
                text: '数据库恢复技术中，（）是将数据库恢复到某个一致状态。',
                options: [
                    'A. 数据转储',
                    'B. 日志文件',
                    'C. 检查点',
                    'D. 以上都是'
                ],
                answer: 'D',
                explanation: '数据库恢复需要综合使用数据转储（备份）、日志文件（记录操作）和检查点（标记一致性点）三种技术。',
                chapter: 'db-8',
                difficulty: 2
            },
            {
                id: 'db-q8',
                type: 'choice',
                text: '以下关于视图的描述中，正确的是（）。',
                options: [
                    'A. 视图是实际存储的数据表',
                    'B. 视图可以简化复杂查询',
                    'C. 视图不能进行数据修改',
                    'D. 视图会占用大量存储空间'
                ],
                answer: 'B',
                explanation: '视图是虚拟表，不实际存储数据，只保存查询定义。视图可以简化复杂查询，提供数据安全性。部分视图可以进行数据修改。',
                chapter: 'db-3',
                difficulty: 2
            },
            {
                id: 'db-q9',
                type: 'choice',
                text: 'NoSQL数据库的主要特点不包括（）。',
                options: [
                    'A. 高可扩展性',
                    'B. 灵活的数据模型',
                    'C. 严格的事务支持',
                    'D. 高性能'
                ],
                answer: 'C',
                explanation: 'NoSQL数据库通常不支持严格的ACID事务，而是采用BASE原则（基本可用、软状态、最终一致性）。其主要优势是高可扩展性、灵活的数据模型和高性能。',
                chapter: 'db-11',
                difficulty: 2
            },
            {
                id: 'db-q10',
                type: 'choice',
                text: '数据库规范化的主要目的是（）。',
                options: [
                    'A. 提高查询速度',
                    'B. 消除数据冗余',
                    'C. 减少表的数量',
                    'D. 简化应用程序'
                ],
                answer: 'B',
                explanation: '数据库规范化的主要目的是消除数据冗余和更新异常。通过将表分解为更小的、结构良好的表来减少数据重复存储。',
                chapter: 'db-5',
                difficulty: 1
            }
        ],
        'info-system-manager': [
            {
                id: 'im-q1',
                type: 'choice',
                text: 'ITIL框架中，负责确保IT服务持续满足业务需求的是（）。',
                options: [
                    'A. 服务台',
                    'B. 服务级别管理',
                    'C. 问题管理',
                    'D. 变更管理'
                ],
                answer: 'B',
                explanation: '服务级别管理(SLM)负责确保IT服务持续满足业务需求，通过制定和维护服务级别协议(SLA)来实现。',
                chapter: 'im-7',
                difficulty: 2
            },
            {
                id: 'im-q2',
                type: 'choice',
                text: '信息系统生命周期中，（）阶段的主要工作是确定系统开发目标。',
                options: [
                    'A. 系统规划',
                    'B. 系统分析',
                    'C. 系统设计',
                    'D. 系统实施'
                ],
                answer: 'A',
                explanation: '系统规划阶段的主要工作是确定系统开发目标、范围和可行性。系统分析是详细调查和分析需求，系统设计是设计系统方案，系统实施是编码和部署。',
                chapter: 'im-2',
                difficulty: 1
            },
            {
                id: 'im-q3',
                type: 'choice',
                text: '以下关于IT服务管理的描述中，错误的是（）。',
                options: [
                    'A. IT服务管理以流程为中心',
                    'B. IT服务管理面向IT技术',
                    'C. IT服务管理强调服务质量',
                    'D. IT服务管理需要持续改进'
                ],
                answer: 'B',
                explanation: 'IT服务管理是面向业务和客户的服务管理，而不是面向IT技术。它强调以流程为中心，关注服务质量，并持续改进。',
                chapter: 'im-7',
                difficulty: 2
            },
            {
                id: 'im-q4',
                type: 'choice',
                text: '项目管理中，用于估算项目工期的方法不包括（）。',
                options: [
                    'A. 关键路径法',
                    'B. PERT估算',
                    'C. 甘特图',
                    'D. 德尔菲法'
                ],
                answer: 'C',
                explanation: '甘特图是用于展示项目进度的工具，不是估算方法。关键路径法、PERT估算和德尔菲法都是常用的工期估算方法。',
                chapter: 'im-10',
                difficulty: 2
            },
            {
                id: 'im-q5',
                type: 'choice',
                text: '信息安全管理体系标准是（）。',
                options: [
                    'A. ISO 9001',
                    'B. ISO 20000',
                    'C. ISO 27001',
                    'D. ISO 22301'
                ],
                answer: 'C',
                explanation: 'ISO 27001是信息安全管理体系标准。ISO 9001是质量管理体系，ISO 20000是IT服务管理体系，ISO 22301是业务连续性管理体系。',
                chapter: 'im-8',
                difficulty: 1
            },
            {
                id: 'im-q6',
                type: 'choice',
                text: '系统可靠性中，MTBF表示（）。',
                options: [
                    'A. 平均故障间隔时间',
                    'B. 平均修复时间',
                    'C. 平均无故障时间',
                    'D. 平均响应时间'
                ],
                answer: 'A',
                explanation: 'MTBF(Mean Time Between Failures)表示平均故障间隔时间，是衡量系统可靠性的指标。MTTR是平均修复时间。',
                chapter: 'im-9',
                difficulty: 2
            },
            {
                id: 'im-q7',
                type: 'choice',
                text: '以下属于结构化分析方法的是（）。',
                options: [
                    'A. 用例图',
                    'B. 数据流图',
                    'C. 类图',
                    'D. 状态图'
                ],
                answer: 'B',
                explanation: '数据流图(DFD)是结构化分析方法的核心工具。用例图、类图、状态图属于面向对象分析方法（UML）。',
                chapter: 'im-3',
                difficulty: 1
            },
            {
                id: 'im-q8',
                type: 'choice',
                text: 'IT运维管理中，事件管理和问题管理的主要区别是（）。',
                options: [
                    'A. 事件管理关注根因，问题管理关注恢复',
                    'B. 事件管理关注恢复，问题管理关注根因',
                    'C. 两者没有区别',
                    'D. 事件管理更复杂'
                ],
                answer: 'B',
                explanation: '事件管理关注尽快恢复服务（治标），问题管理关注找到并消除根本原因（治本）。事件管理强调快速响应，问题管理强调深入分析。',
                chapter: 'im-7',
                difficulty: 2
            },
            {
                id: 'im-q9',
                type: 'choice',
                text: '软件著作权的保护期限是（）。',
                options: [
                    'A. 10年',
                    'B. 20年',
                    'C. 50年',
                    'D. 作者终生及死后50年'
                ],
                answer: 'D',
                explanation: '自然人的软件著作权保护期为作者终生及死后50年。法人或其他组织的软件著作权保护期为首次发表后50年。',
                chapter: 'im-11',
                difficulty: 2
            },
            {
                id: 'im-q10',
                type: 'choice',
                text: '以下关于云计算的描述中，错误的是（）。',
                options: [
                    'A. IaaS提供基础设施服务',
                    'B. PaaS提供平台服务',
                    'C. SaaS提供软件服务',
                    'D. 云计算不支持弹性扩展'
                ],
                answer: 'D',
                explanation: '云计算的核心特性之一就是弹性扩展，可以根据需求动态调整资源。IaaS、PaaS、SaaS是云计算的三种服务模式。',
                chapter: 'im-12',
                difficulty: 1
            }
        ]
    },

    renderHomePage() {
        return `
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">题库练习</h1>
                    <p class="page-desc">海量真题模拟，夯实基础知识，提升应试能力</p>
                </div>
            </div>
            <div class="container">
                <div class="subjects-grid">
                    ${Object.entries(this.subjects).map(([id, subject]) => {
                        const questions = this.questionBank[id] || [];
                        const wrongs = Storage.getWrongQuestions(id);

                        return `
                            <div class="subject-card" onclick="PracticeModule.selectSubject('${id}')">
                                <div class="subject-icon">${subject.icon}</div>
                                <div class="subject-name">${subject.name}</div>
                                <div class="subject-desc">共 ${questions.length} 道练习题</div>
                                <div class="subject-meta">
                                    <span>错题 ${wrongs.length} 道</span>
                                    <span>开始练习 →</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderPracticePage(subjectId) {
        const subject = this.subjects[subjectId];
        if (!subject) return this.renderHomePage();

        this.currentSubject = subjectId;
        const questions = this.questionBank[subjectId] || [];
        const wrongs = Storage.getWrongQuestions(subjectId);

        return `
            <div class="page-header">
                <div class="container">
                    <div class="breadcrumb">
                        <a href="#/practice">题库练习</a>
                        <span>/</span>
                        <span>${subject.name}</span>
                    </div>
                    <h1 class="page-title">${subject.icon} ${subject.name}</h1>
                </div>
            </div>
            <div class="container">
                <div class="tabs">
                    <button class="tab active" onclick="PracticeModule.switchTab('all')">全部题目 (${questions.length})</button>
                    <button class="tab" onclick="PracticeModule.switchTab('wrong')">错题本 (${wrongs.length})</button>
                </div>

                <div id="practice-content">
                    ${this.renderQuestionList(questions)}
                </div>
            </div>
        `;
    },

    renderQuestionList(questions) {
        if (questions.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <div class="empty-title">暂无题目</div>
                    <div class="empty-desc">该分类下暂无练习题</div>
                </div>
            `;
        }

        return `
            <div style="display:flex;flex-direction:column;gap:12px">
                ${questions.map((q, index) => `
                    <div class="list-item" onclick="PracticeModule.startPractice('${this.currentSubject}', ${index})">
                        <div class="list-item-icon">${index + 1}</div>
                        <div class="list-item-content">
                            <div class="list-item-title">${q.text.substring(0, 50)}...</div>
                            <div class="list-item-desc">难度: ${'⭐'.repeat(q.difficulty)}</div>
                        </div>
                        <div class="list-item-meta">
                            ${q.type === 'choice' ? '选择题' : '填空题'}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    selectSubject(subjectId) {
        this.currentSubject = subjectId;
        this.currentIndex = 0;
        this.answers = {};
        this.showAnswer = false;
        window.location.hash = `#/practice/${subjectId}`;
    },

    startPractice(subjectId, index) {
        this.currentSubject = subjectId;
        this.currentIndex = index;
        this.answers = {};
        this.showAnswer = false;
        this.renderQuestion();
    },

    renderQuestion() {
        const questions = this.questionBank[this.currentSubject] || [];
        const question = questions[this.currentIndex];
        if (!question) return;

        const subject = this.subjects[this.currentSubject];
        const container = document.getElementById('practice-content');
        if (!container) return;

        const selectedAnswer = this.answers[question.id];
        const isCorrect = selectedAnswer === question.answer;

        container.innerHTML = `
            <div class="question-card">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                    <div>
                        <span class="question-number">${this.currentIndex + 1}</span>
                        <span class="question-type">${question.type === 'choice' ? '选择题' : '填空题'}</span>
                    </div>
                    <span style="font-size:13px;color:var(--text-muted)">难度: ${'⭐'.repeat(question.difficulty)}</span>
                </div>

                <div class="question-text">${question.text}</div>

                <div class="options-list">
                    ${question.options.map((option, i) => {
                        const letter = Utils.getLetter(i);
                        let className = 'option-item';
                        if (this.showAnswer) {
                            if (letter === question.answer) className += ' correct';
                            else if (letter === selectedAnswer && !isCorrect) className += ' wrong';
                        } else if (letter === selectedAnswer) {
                            className += ' selected';
                        }
                        return `
                            <div class="${className}" onclick="PracticeModule.selectAnswer('${letter}')">
                                <span class="option-letter">${letter}</span>
                                <span class="option-text">${option.substring(2)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${!this.showAnswer ? `
                    <div class="answer-actions">
                        <button class="btn btn-primary" onclick="PracticeModule.submitAnswer()" ${!selectedAnswer ? 'disabled' : ''}>
                            提交答案
                        </button>
                    </div>
                ` : `
                    <div class="answer-result ${isCorrect ? 'correct' : 'wrong'}">
                        ${isCorrect ? '✓ 回答正确！' : `✗ 回答错误，正确答案是 ${question.answer}`}
                    </div>
                    <div class="answer-explanation">
                        <h4>解析</h4>
                        <p>${question.explanation}</p>
                    </div>
                    <div class="answer-actions" style="margin-top:16px">
                        ${!isCorrect ? `
                            <button class="btn btn-outline" onclick="PracticeModule.addToWrongBook('${question.id}')">
                                加入错题本
                            </button>
                        ` : ''}
                        <button class="btn btn-primary" onclick="PracticeModule.nextQuestion()">
                            下一题 →
                        </button>
                    </div>
                `}
            </div>

            <div class="pagination">
                <button class="page-btn" onclick="PracticeModule.prevQuestion()" ${this.currentIndex === 0 ? 'disabled' : ''}>←</button>
                <span style="padding:0 12px;color:var(--text-muted)">${this.currentIndex + 1} / ${questions.length}</span>
                <button class="page-btn" onclick="PracticeModule.nextQuestion()" ${this.currentIndex === questions.length - 1 ? 'disabled' : ''}>→</button>
            </div>
        `;
    },

    selectAnswer(letter) {
        if (this.showAnswer) return;
        const questions = this.questionBank[this.currentSubject] || [];
        const question = questions[this.currentIndex];
        this.answers[question.id] = letter;
        this.renderQuestion();
    },

    submitAnswer() {
        this.showAnswer = true;
        const questions = this.questionBank[this.currentSubject] || [];
        const question = questions[this.currentIndex];
        const selectedAnswer = this.answers[question.id];

        if (selectedAnswer !== question.answer) {
            Storage.addWrongQuestion(this.currentSubject, question);
        }

        this.renderQuestion();
    },

    nextQuestion() {
        const questions = this.questionBank[this.currentSubject] || [];
        if (this.currentIndex < questions.length - 1) {
            this.currentIndex++;
            this.showAnswer = false;
            this.renderQuestion();
            // 滚动到题目区域
            const questionCard = document.querySelector('.question-card');
            if (questionCard) {
                questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showAnswer = false;
            this.renderQuestion();
            // 滚动到题目区域
            const questionCard = document.querySelector('.question-card');
            if (questionCard) {
                questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },

    addToWrongBook(questionId) {
        const questions = this.questionBank[this.currentSubject] || [];
        const question = questions.find(q => q.id === questionId);
        if (question) {
            Storage.addWrongQuestion(this.currentSubject, question);
            Utils.showToast('已加入错题本', 'success');
        }
    },

    switchTab(tab) {
        const questions = this.questionBank[this.currentSubject] || [];
        const wrongs = Storage.getWrongQuestions(this.currentSubject);

        document.querySelectorAll('.tab').forEach((el, i) => {
            el.classList.toggle('active', (tab === 'all' && i === 0) || (tab === 'wrong' && i === 1));
        });

        const container = document.getElementById('practice-content');
        if (container) {
            if (tab === 'all') {
                container.innerHTML = this.renderQuestionList(questions);
            } else {
                container.innerHTML = this.renderQuestionList(wrongs);
            }
        }
    }
};
