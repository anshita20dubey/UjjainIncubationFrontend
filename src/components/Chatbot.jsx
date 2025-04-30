import React, { useState, useEffect, useRef } from "react";
import {
    MessageCircle,
    Send,
    User,
    X,
    Home,
    HelpCircle,
    MessageSquare,
    ChevronRight,
    ArrowLeft,
    Users,
    Heart,
    Award,
    Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SYSTEM_PROMPT = `You are an AI assistant representing the Ujjain Incubation Center, an initiative in collaboration with Smart City Ltd, inspired by SICSatna and RiseJhansi. The center is dedicated to fostering innovation, supporting startups, and empowering entrepreneurs in Ujjain by providing mentorship, resources, and networking opportunities.

Your primary responsibilities include:
- Providing Information: Explain what Ujjain Incubation Center is, its mission, and how it supports startups.
- Guiding Users on Joining: Direct users to the registration link (https://ujjainincubationcenter.com) for membership or program applications.
- Answering FAQs: Address inquiries based on the center’s mission and website information.
- Encouraging Engagement: Motivate entrepreneurs to join programs, attend workshops, or connect with mentors.
- Clarifying Roles: Explain the roles of mentors (experienced professionals) and members (startups/entrepreneurs).
- Promoting Uniqueness: Highlight that the center is a unique, accessible platform for innovation in Ujjain, offering free or subsidized resources.
If information is unavailable, direct users to https://ujjainincubationcenter.com. Keep responses concise, professional, and inspiring (2-3 sentences max).`;

const FAQ_QUESTIONS = [
    {
        question: "What is Ujjain Incubation Center?",
        answer: "Ujjain Incubation Center, in collaboration with Smart City Ltd, supports startups and entrepreneurs in Ujjain with mentorship, resources, and networking. It fosters innovation and growth, inspired by SICSatna and RiseJhansi.",
        image: "/images/logo-uscl.jpg"
    },
    {
        question: "How can I join Ujjain Incubation Center?",
        answer: "Visit https://ujjainincubationcenter.com to register for membership or apply for programs. It’s free to join, with access to mentorship and startup resources.",
        image: "/images/Special1.png"
    },
    {
        question: "Who are the mentors at Ujjain Incubation Center?",
        answer: "Mentors are experienced professionals and industry leaders who provide guidance to startups. They offer free or subsidized support to help entrepreneurs succeed.",
        image: "/images/Special2.png"
    }
];

const HELP_SECTIONS = [
    {
        title: "Getting Started",
        content: "Welcome to Ujjain Incubation Center! Register at https://ujjainincubationcenter.com to join our ecosystem. Complete your profile to connect with mentors and access resources.",
        image: "/images/Special3.png",
        icon: Home
    },
    {
        title: "How It Works",
        content: "Ujjain Incubation Center connects startups with mentors, offers workshops, and provides co-working spaces. Engage in programs to grow your business. Learn more at https://ujjainincubationcenter.com.",
        image: "/images/Special4.png",
        icon: Users
    },
    {
        title: "Benefits of Joining",
        content: "Members gain access to free mentorship, funding opportunities, and a vibrant startup community. Ujjain Incubation Center is your gateway to innovation. Visit https://ujjainincubationcenter.com for details.",
        image: "/images/Special5.png",
        icon: Heart
    },
    {
        title: "Becoming a Mentor",
        content: "Experienced professionals can join as mentors to guide startups. Share your expertise and contribute to Ujjain’s entrepreneurial ecosystem. Apply at https://ujjainincubationcenter.com.",
        image: "/images/Special6.png",
        icon: Award
    }
];

const HelpSection = ({ selectedHelp, setSelectedHelp }) => {
    if (selectedHelp) {
        return (
            <div className="bg-gray-50 p-4 flex-1 overflow-y-auto">
                <div className="mb-4">
                    <button
                        onClick={() => setSelectedHelp(null)}
                        className="flex items-center text-[#ff9933] hover:text-[#e68a00] transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </button>
                </div>
                <div className="container mx-auto">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{selectedHelp.title}</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                            <p
                                className="text-sm text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: selectedHelp.content.replace(
                                        /\[(.*?)\]\((.*?)\)/g,
                                        '<a href="$2" target="_blank" class="text-[#ff9933] hover:text-[#e68a00] underline">$1</a>'
                                    ),
                                }}
                            />
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={selectedHelp.image}
                                alt={selectedHelp.title}
                                className="w-full h-auto rounded-lg shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-4 flex-1 overflow-y-auto">
            <div className="space-y-3">
                {HELP_SECTIONS.map((section, index) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedHelp(section)}
                            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#ff9933] rounded-full">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{section.title}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [selectedHelp, setSelectedHelp] = useState(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const welcomeMessages = [
        {
            sender: "bot",
            text: "Welcome to Ujjain Incubation Center!",
        },
        {
            sender: "bot",
            text: "I’m Astraa, your AI assistant, here to guide you through our startup ecosystem.",
        },
        {
            sender: "bot",
            text: "How can I assist you today?",
        },
    ];
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if the device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const generateChatGPTPrompt = (userMessage) => ({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
        ],
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current && activeSection === "messages") {
            setTimeout(() => inputRef.current.focus(), 300);
        }
    }, [isOpen, activeSection]);

    // Add body class to prevent scrolling when chat is open on mobile
    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen, isMobile]);

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        const userMessage = input;
        setInput("");
        setIsTyping(true);

        try {
            const prompt = generateChatGPTPrompt(userMessage);
            const response = await axios.post(
                process.env.REACT_APP_OPENAI_API_URL,
                prompt,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const botResponse =
                response.data.choices?.[0]?.message?.content ||
                "I couldn't generate a response. Please try again.";

            setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
        } catch (error) {
            console.error("Error calling ChatGPT API:", error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "I apologize, but I'm having trouble processing your request at the moment. Please try again later.",
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    // Function to add messages with delay
    const addMessagesSequentially = async () => {
        for (let i = 0; i < welcomeMessages.length; i++) {
            setIsTyping(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMessages((prev) => [...prev, welcomeMessages[i]]);
            setIsTyping(false);
            if (i < welcomeMessages.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }
    };

    useEffect(() => {
        if (isOpen && activeSection === "messages" && messages.length === 0) {
            addMessagesSequentially();
        }
    }, [isOpen, activeSection, messages.length]);

    const renderMessages = () => (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                        <div
                            className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
                        >
                            {msg.sender === "bot" && (
                                <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-sm">
                                        <img
                                            src="/images/logo-uscl.jpg"
                                            alt="Bot Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-gray-500">Astraa</span>
                                </div>
                            )}

                            <div
                                className={`${msg.sender === "user"
                                    ? "bg-gradient-to-r from-[#ff9933] to-[#e68a00] text-white rounded-t-xl rounded-bl-xl"
                                    : "bg-white text-gray-800 rounded-t-xl rounded-br-xl shadow-sm"
                                    } py-2 px-3 text-sm leading-normal break-words`}
                            >
                                <p className="text-[13px] sm:text-[14px]">{msg.text}</p>
                            </div>

                            {msg.sender === "user" && (
                                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#ff9933] to-[#e68a00] flex items-center justify-center shadow-sm">
                                    <User className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-end space-x-2">
                            <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-sm">
                                    <img
                                        src="/images/logo-uscl.jpg"
                                        alt="Bot Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-[10px] sm:text-xs text-gray-500">Astraa</span>
                            </div>
                            <div className="bg-white rounded-t-xl rounded-br-xl py-2 px-3 shadow-sm">
                                <div className="flex space-x-1">
                                    <div
                                        className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                    />
                                    <div
                                        className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-bounce"
                                        style={{ animationDelay: "200ms" }}
                                    />
                                    <div
                                        className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-bounce"
                                        style={{ animationDelay: "400ms" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 px-2 sm:px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#ff9933] focus:ring-1 focus:ring-[#ff9933] transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-2 sm:px-3 py-2 bg-gradient-to-r from-[#ff9933] to-[#e68a00] hover:opacity-90 text-white rounded-lg transition-all shadow-sm flex items-center justify-center min-w-[40px] min-h-[40px]"
                        aria-label="Send message"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );

    const renderHome = () => (
        <div className="flex flex-col h-full bg-gray-50 p-4 overflow-y-auto relative">
            <div className="mb-6 bg-gradient-to-r from-[#ff9933] to-[#e68a00] p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                        <img
                            src="/images/logo-uscl.jpg"
                            alt="Bot Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white">Ujjain Incubation Center</h1>
                        <h2 className="text-sm text-gray-100">Hi, I’m Astraa – your startup guide!</h2>
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                {FAQ_QUESTIONS.map((faq, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedFAQ(faq)}
                        className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                    >
                        <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                    </button>
                ))}
            </div>
            <button
                onClick={() => setActiveSection("messages")}
                className="absolute bottom-4 left-4 right-4 p-3 bg-gradient-to-r from-[#ff9933] to-[#e68a00] text-white rounded-lg shadow-sm hover:opacity-90 transition-all text-sm w-[calc(100%-2rem)]"
            >
                Send us a message
            </button>
        </div>
    );

    const renderFAQDetail = () => (
        <div className="bg-gray-50 p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
                <button
                    onClick={() => setSelectedFAQ(null)}
                    className="flex items-center text-[#ff9933] hover:text-[#e68a00] transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
            </div>
            <div className="container mx-auto">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{selectedFAQ.question}</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedFAQ.answer}</p>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src={selectedFAQ.image}
                            alt={selectedFAQ.question}
                            className="w-full h-auto rounded-lg shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const getChatbotDimensions = () => {
        if (isMobile) {
            return { width: "100%", height: "100%" };
        }
        return selectedFAQ || selectedHelp
            ? { width: "600px", height: "600px" }
            : { width: "380px", height: "600px" };
    };

    return (
        <div className={`${isOpen && isMobile ? 'fixed inset-0 z-50' : 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50'}`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${isMobile ? 'w-full h-full' : 'max-w-[600px] max-h-[600px] rounded-xl sm:rounded-2xl'} shadow-2xl overflow-hidden flex flex-col border border-gray-200 bg-white`}
                        style={getChatbotDimensions()}
                        initial={isMobile ? { opacity: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
                        animate={isMobile ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
                        exit={isMobile ? { opacity: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        {/* Navbar / Header */}
                        <div className="bg-white p-3 sm:p-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-sm">
                                    <img
                                        src="/images/logo-uscl.jpg"
                                        alt="Bot Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-sm sm:text-base text-gray-900 font-semibold">Ujjain Incubation Center</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex overflow-hidden">
                            {selectedFAQ ? renderFAQDetail() : (
                                <>
                                    {activeSection === "home" && renderHome()}
                                    {activeSection === "messages" && renderMessages()}
                                    {activeSection === "help" && (
                                        <HelpSection selectedHelp={selectedHelp} setSelectedHelp={setSelectedHelp} />
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer Navigation */}
                        <div className="bg-white p-3 border-t border-gray-200 flex-shrink-0">
                            <div className="flex justify-around">
                                {[
                                    { section: "home", icon: Home, label: "Home" },
                                    { section: "messages", icon: MessageSquare, label: "Messages" },
                                    { section: "help", icon: Globe, label: "Help" },
                                ].map(({ section, icon: Icon, label }) => (
                                    <button
                                        key={section}
                                        onClick={() => {
                                            setActiveSection(section);
                                            setSelectedFAQ(null);
                                            setSelectedHelp(null);
                                        }}
                                        className={`flex flex-col items-center space-y-1 text-gray-600 hover:text-[#ff9933] transition-colors ${activeSection === section ? "text-[#ff9933]" : ""}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-xs">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#ff9933] to-[#e68a00] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ boxShadow: "0 8px 20px rgba(255, 153, 51, 0.3)" }}
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.button>
            )}
        </div>
    );
}

export default Chatbot;