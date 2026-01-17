
// ============================================
// RENDER: QUIZ / LESSON
// ============================================
const StartNode = (node) => {
    // If it's a simple lesson, we might just show text then finish
    // If it's a quiz, we load questions
    if (node.type === 'lesson') {
        // Check if it has a quiz inside content
        const quizContent = node.content.find(c => c.type === 'quiz');
        if (quizContent) {
            setCurrentQuiz({
                nodeId: node.id,
                questions: [{ question: quizContent.question, options: quizContent.options }],
                currentIndex: 0,
                score: 0,
                showResult: false
            });
        } else {
            // Simple text lesson
            setCurrentQuiz({
                nodeId: node.id,
                questions: [],
                content: node.content,
                currentIndex: 0,
                isLesson: true
            });
        }
    } else if (node.type === 'quiz_review') {
        setCurrentQuiz({
            nodeId: node.id,
            questions: node.questions,
            currentIndex: 0,
            score: 0
        });
    }
    setAppState(STATES.QUIZ);
};

const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
        awardPoints(5, "Correct Answer!");
        const newScore = (currentQuiz.score || 0) + 1;
        setCurrentQuiz(prev => ({ ...prev, score: newScore, answerStatus: 'correct' }));
    } else {
        setCurrentQuiz(prev => ({ ...prev, answerStatus: 'incorrect' }));
    }

    // Wait then next
    setTimeout(() => {
        setCurrentQuiz(prev => {
            const nextIndex = prev.currentIndex + 1;
            if (nextIndex >= (prev.questions ? prev.questions.length : 0)) {
                // Finish
                completeNode(prev.nodeId);
                return { ...prev, showResult: true };
            }
            return { ...prev, currentIndex: nextIndex, answerStatus: null };
        });
    }, 1500);
};

const completeNode = (nodeId) => {
    if (!completedNodes.includes(nodeId)) {
        const newCompleted = [...completedNodes, nodeId];
        setCompletedNodes(newCompleted);
        localStorage.setItem("completedNodes", JSON.stringify(newCompleted));
        awardPoints(20, "Lesson Completed!");
        if (newCompleted.length % 3 === 0) {
            checkAndAwardBadge("scholar", "Scholar", true);
        }
    }
};

const renderQuiz = () => {
    if (!currentQuiz) return null;

    // If showing result (lesson/quiz complete)
    if (currentQuiz.showResult) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h2>
                    <p className="text-gray-600 mb-8">+20 XP Earned</p>
                    <button
                        onClick={() => {
                            setCurrentQuiz(null);
                            setAppState(STATES.ACADEMY);
                        }}
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
                    >
                        Continue Learning
                    </button>
                </div>
            </div>
        );
    }

    // Render Lesson Content (Text only)
    if (currentQuiz.isLesson && currentQuiz.content) {
        return (
            <div className="min-h-screen bg-white p-6 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
                    <Sprout className="w-16 h-16 text-green-500 mb-6" />
                    {currentQuiz.content.map((block, i) => (
                        <div key={i} className="mb-6">
                            {block.type === 'text' && (
                                <p className="text-2xl font-medium text-gray-800 leading-relaxed">
                                    {block.text}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => {
                        completeNode(currentQuiz.nodeId);
                        setCurrentQuiz(prev => ({ ...prev, showResult: true }));
                    }}
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-xl"
                >
                    Got it!
                </button>
            </div>
        );
    }

    // Render Question
    const question = currentQuiz.questions[currentQuiz.currentIndex];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center justify-between">
                <button onClick={() => setAppState(STATES.ACADEMY)} className="p-2"><X className="w-6 h-6 text-gray-400" /></button>
                <div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${((currentQuiz.currentIndex) / currentQuiz.questions.length) * 100}%` }}
                    />
                </div>
                <div className="font-bold text-green-600">{currentQuiz.score} pts</div>
            </div>

            {/* Question Area */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{question.question}</h2>

                    <div className="space-y-4">
                        {question.options.map((opt) => {
                            let statusClass = "bg-white border-2 border-gray-200 hover:border-gray-300";
                            if (currentQuiz.answerStatus) {
                                if (opt.correct) statusClass = "bg-green-100 border-2 border-green-500 text-green-800";
                                else if (!opt.correct && currentQuiz.answerStatus === 'incorrect') {
                                    // We only highlight selected as wrong if we tracked selection, but for simplicity:
                                    statusClass = "bg-white border-2 border-gray-200 opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => !currentQuiz.answerStatus && handleQuizAnswer(opt.correct)}
                                    className={`w-full p-4 rounded-xl text-left font-medium transition-all transform hover:scale-[1.02] ${statusClass}`}
                                >
                                    {opt.text}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Status Footer */}
            {currentQuiz.answerStatus && (
                <div className={`p-6 ${currentQuiz.answerStatus === 'correct' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className="max-w-xl mx-auto flex items-center gap-4">
                        {currentQuiz.answerStatus === 'correct' ? (
                            <>
                                <div className="bg-green-500 rounded-full p-2"><CheckSquare className="w-6 h-6 text-white" /></div>
                                <div className="font-bold text-green-800">Excellent!</div>
                            </>
                        ) : (
                            <>
                                <div className="bg-red-500 rounded-full p-2"><X className="w-6 h-6 text-white" /></div>
                                <div className="font-bold text-red-800">Incorrect</div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================
// RENDER: ACADEMY
// ============================================
const renderAcademy = () => {
    return (
        <div className="min-h-screen bg-white pb-20">
            <Navbar
                title={t.farmAcademy}
                showBack={true}
                onBack={() => setAppState(STATES.LANDING)}
                t={t}
                currentLang={language}
                onLanguageClick={() => setShowLanguageSelector(true)}
            />

            <main className="pt-20 px-4 max-w-xl mx-auto">
                {/* Header Card */}
                <div className="bg-green-600 rounded-2xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Sustainable Farming Path</h2>
                        <p className="opacity-90">Master organic inputs & soil health.</p>
                    </div>
                    <Sprout className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-green-500 opacity-50" />
                </div>

                {/* Units */}
                <div className="space-y-8">
                    {SUSTAINABLE_FARMING_COURSE.map((unit, uIdx) => (
                        <div key={unit.id} className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl ${uIdx === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {React.createElement(unit.icon, { size: 24 })}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{unit.title}</h3>
                                    <p className="text-sm text-gray-500">{unit.description}</p>
                                </div>
                            </div>

                            {/* Path Nodes */}
                            <div className="flex flex-col items-center space-y-6 relative">
                                {/* Connecting Line */}
                                {/* <div className="absolute top-0 bottom-0 w-2 bg-gray-100 -z-10" /> */}

                                {unit.nodes.map((node, nIdx) => {
                                    const isCompleted = completedNodes.includes(node.id);
                                    // Unlock logic: First node always open. Others check previous.
                                    // For simplicity in this demo, everything is unlocked or simple logic
                                    const isLocked = false;
                                    // Visual ZigZag
                                    const xOffset = nIdx % 2 === 0 ? '-translate-x-4' : 'translate-x-4';

                                    return (
                                        <button
                                            key={node.id}
                                            onClick={() => !isLocked && StartNode(node)}
                                            className={`
                                                    w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform hover:scale-110
                                                    ${isCompleted
                                                    ? 'bg-yellow-400 border-yellow-500'
                                                    : 'bg-green-500 border-green-600'}
                                                    ${xOffset}
                                                `}
                                        >
                                            {isCompleted ? <Star className="text-white fill-white" /> : <Star className="text-white" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

