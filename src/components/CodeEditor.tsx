import React, { useState, useEffect } from 'react';
import { FileCode, ChevronRight, ChevronDown } from 'lucide-react/dist/esm/icons';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-solidity';
import 'prismjs/components/prism-markdown';

interface FileContent {
  name: string;
  content: string[];
  language: string;
}

const files: FileContent[] = [
  {
    name: 'README.md',
    language: 'markdown',
    content: [
      '# Expertise Overview',
      '',
      'Welcome to my portfolio\'s code section! Here you\'ll find examples of my expertise in:',
      '',
      '## 🌐 Web3 Telecom Integration (Arnacon)',
      '- Developed www.arnacon.com - Web3 Telecom Protocol',
      '- Built decentralized communication infrastructure',
      '- Integrated blockchain with traditional telecom systems',
      '',
      '## 🔐 Zero Knowledge & Privacy',
      '- ZK-SNARKs implementation for inheritance verification',
      '- Privacy-preserving communication protocols',
      '- Custom circuit design for secure messaging',
      '',
      '## 📡 Enterprise Telecom Solutions',
      '- Cellact infrastructure development',
      '- High-scale VoIP implementations',
      '- Secure communication protocols',
      '',
      'Click on any file to explore implementations and technical details.',
    ]
  },
  {
    name: 'ArnaconProtocol.sol',
    language: 'solidity',
    content: [
      '// SPDX-License-Identifier: MIT',
      'pragma solidity ^0.8.17;',
      '',
      'import "@openzeppelin/contracts/security/ReentrancyGuard.sol";',
      '',
      'contract ArnaconProtocol is ReentrancyGuard {',
      '    // Web3 Telecom Protocol Implementation',
      '    struct CommunicationChannel {',
      '        address owner;',
      '        bytes32 channelId;',
      '        uint256 encryptionKey;',
      '        bool isActive;',
      '    }',
      '',
      '    mapping(bytes32 => CommunicationChannel) private channels;',
      '',
      '    event ChannelCreated(bytes32 indexed channelId, address indexed owner);',
      '    event MessageSent(bytes32 indexed channelId, bytes encryptedData);',
      '',
      '    function createSecureChannel(bytes32 channelId, uint256 encKey) external {',
      '        require(channels[channelId].owner == address(0), "Channel exists");',
      '        ',
      '        channels[channelId] = CommunicationChannel({',
      '            owner: msg.sender,',
      '            channelId: channelId,',
      '            encryptionKey: encKey,',
      '            isActive: true',
      '        });',
      '',
      '        emit ChannelCreated(channelId, msg.sender);',
      '    }',
      '}'
    ]
  },
  {
    name: 'VoIPIntegration.ts',
    language: 'typescript',
    content: [
      'import { Web3Provider } from "@ethersproject/providers";',
      'import { SIPProtocol } from "./telecom/voip";',
      '',
      'class Web3VoIPBridge {',
      '  private provider: Web3Provider;',
      '  private voipStack: SIPProtocol;',
      '',
      '  constructor(web3Provider: Web3Provider) {',
      '    this.provider = web3Provider;',
      '    this.voipStack = new SIPProtocol({',
      '      encryption: "AES-256-GCM",',
      '      p2pEnabled: true,',
      '      blockchain: {',
      '        enabled: true,',
      '        provider: web3Provider',
      '      }',
      '    });',
      '  }',
      '',
      '  async establishSecureCall(peerAddress: string): Promise<void> {',
      '    const channel = await this.createBlockchainChannel(peerAddress);',
      '    await this.voipStack.connect(channel.id);',
      '    await this.initializeE2EEncryption(channel.key);',
      '  }',
      '}'
    ]
  },
  {
    name: 'ZkWill.circom',
    language: 'circom',
    content: [
      'pragma circom 2.0.0;',
      '',
      'include "../node_modules/circomlib/circuits/bitify.circom";',
      'include "../node_modules/circomlib/circuits/pedersen.circom";',
      'include "../node_modules/circomlib/circuits/comparators.circom";',
      'include "merkleTree.circom";',
      '',
      'template ZkWillOR(levels) {',
      '    signal input root;',
      '    signal input currentTime;',
      '    signal input lockPeriod;',
      '    signal input nullifierHash;',
      '',
      '    signal input depositTime;',
      '    signal input ownerSecret;',
      '    signal input heirSecret;',
      '',
      '    component ownerBits = Num2Bits(248);',
      '    ownerBits.in <== ownerSecret;',
      '',
      '    component heirBits = Num2Bits(248);',
      '    heirBits.in <== heirSecret;',
      '',
      '    signal ownerKey <== ownerPedersen.out[0];',
      '    signal heirKey <== heirPedersen.out[0];',
      '',
      '    component merkleProof = MerkleTreeChecker(levels);',
      '    merkleProof.leaf <== leaf;',
      '    merkleProof.root <== root;',
      '}'
    ]
  },
  {
    name: 'TelecomProtocols.ts',
    language: 'typescript',
    content: [
      'import { SIPProtocol, Kamailio, LoadBalancer } from "./voip-stack";',
      '',
      'class TelecomExpertise {',
      '  private readonly voipStack: SIPProtocol;',
      '  private readonly loadBalancer: LoadBalancer;',
      '',
      '  async initializeStack(): Promise<void> {',
      '    this.voipStack = await SIPProtocol.initialize({',
      '      maxConnections: 1_000_000,',
      '      encryption: "TLS_1.3",',
      '      codec: "OPUS"',
      '    });',
      '',
      '    this.loadBalancer = new LoadBalancer({',
      '      algorithm: "least_connections",',
      '      healthCheck: true,',
      '      failover: true',
      '    });',
      '  }',
      '',
      '  async handleCall(session: Session): Promise<void> {',
      '    const route = await this.loadBalancer.getOptimalRoute();',
      '    await this.voipStack.establishConnection(session, route);',
      '    await this.monitor.track(session.id);',
      '  }',
      '}'
    ]
  },
  {
    name: 'BlockchainSecurity.sol',
    language: 'solidity',
    content: [
      '// SPDX-License-Identifier: MIT',
      'pragma solidity ^0.8.17;',
      '',
      'import "@openzeppelin/contracts/security/ReentrancyGuard.sol";',
      'import "@openzeppelin/contracts/access/Ownable.sol";',
      '',
      'contract SecurityImplementation is ReentrancyGuard, Ownable {',
      '    mapping(address => uint256) private balances;',
      '    uint256 private constant MAX_INT = 2**256 - 1;',
      '',
      '    function deposit() external payable nonReentrant {',
      '        require(msg.value > 0, "Invalid amount");',
      '        require(balances[msg.sender] + msg.value <= MAX_INT);',
      '',
      '        balances[msg.sender] += msg.value;',
      '        emit Deposit(msg.sender, msg.value);',
      '    }',
      '',
      '    function withdraw(uint256 amount) external nonReentrant {',
      '        require(balances[msg.sender] >= amount);',
      '        balances[msg.sender] -= amount;',
      '',
      '        (bool success, ) = msg.sender.call{value: amount}("");',
      '        require(success, "Transfer failed");',
      '    }',
      '}'
    ]
  }
];

const CodeEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const startExploring = () => {
    setSelectedFile(files[0]);
    setIsExpanded(true);
  };

  useEffect(() => {
    if (!selectedFile) return;

    let isMounted = true;
    setIsTyping(true);
    setDisplayedContent([]);
    let currentLine = 0;

    const typeNextLine = () => {
      if (!isMounted) return;
      
      if (currentLine < selectedFile.content.length) {
        setDisplayedContent(prev => [...prev, selectedFile.content[currentLine]]);
        currentLine++;
        setTimeout(typeNextLine, 50);
      } else {
        setIsTyping(false);
        Prism.highlightAll();
      }
    };

    typeNextLine();

    return () => {
      isMounted = false;
    };
  }, [selectedFile]);

  return (
    <div className="flex h-[80vh] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 code-editor animated-bg">
      {/* File Explorer */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div 
          className="flex items-center text-gray-300 p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => isExpanded ? setIsExpanded(false) : startExploring()}
        >
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          <span className="ml-2 select-none">expertise/</span>
        </div>
        
        {isExpanded && (
          <div className="space-y-1">
            {files.map((file) => (
              <div
                key={file.name}
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  selectedFile?.name === file.name 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedFile(file)}
              >
                <FileCode size={16} className="mr-2" />
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code View */}
      <div className="flex-1 overflow-auto">
        {!selectedFile ? (
          <div className="h-full flex items-center justify-center">
            <button
              onClick={startExploring}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transform transition-all duration-200 hover:scale-105
                       flex items-center space-x-2"
            >
              <span>Click to Explore</span>
              <ChevronRight size={20} />
            </button>
          </div>
        ) : (
          <div className="p-4 font-mono text-sm">
            <pre className="relative">
              <code className={`language-${selectedFile.language} block`}>
                {displayedContent.join('\n')}
              </code>
              {isTyping && (
                <span className="absolute inline-block h-4 w-2 bg-white animate-pulse">
                  ▋
                </span>
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;