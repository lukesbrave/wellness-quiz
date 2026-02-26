'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Question types
type QuestionType = 'single' | 'multi' | 'scale' | 'email'

interface Question {
  id: string
  type: QuestionType
  question: string
  subtitle?: string
  options?: { id: string; label: string; icon?: string }[]
  scaleLabels?: { low: string; high: string }
  category?: string
}

// The wellness quiz questions
const QUESTIONS: Question[] = [
  // Q1
  {
    id: 'daily-energy',
    type: 'single',
    question: 'Which phrase best describes your current daily energy?',
    category: 'situation',
    options: [
      { id: 'fumes', label: 'Running on fumes by noon' },
      { id: 'rut', label: 'Stuck in a rut and unmotivated' },
      { id: 'behind', label: 'Waking up already behind the 8-ball' },
      { id: 'steady', label: 'Moderately steady but easily derailed' },
      { id: 'crash', label: 'Morning surge, midday crash, evening guilt' },
    ],
  },
  // Q2
  {
    id: 'consistency-obstacle',
    type: 'single',
    question: 'What is the biggest obstacle to your consistency?',
    category: 'pain',
    options: [
      { id: 'overwhelm', label: 'Crushing overwhelm, burnout and decision fatigue' },
      { id: 'career', label: 'High-pressure career demands' },
      { id: 'family', label: 'Sandwich generation family stress' },
      { id: 'willpower', label: 'Trying to rely on willpower alone' },
      { id: 'out-of-control', label: 'My health is out of control' },
    ],
  },
  // Q3
  {
    id: 'symptoms',
    type: 'multi',
    question: 'Which of these symptoms are you currently experiencing?',
    subtitle: 'Select all that apply',
    category: 'pain',
    options: [
      { id: 'brain-fog', label: 'Brain fog and memory lapses' },
      { id: 'motivation', label: 'Lack of motivation' },
      { id: 'joint-pain', label: 'Joint pain or physical fragility' },
      { id: 'excess-weight', label: 'Carrying excess body weight' },
      { id: 'overwhelm', label: 'Overwhelm' },
      { id: 'exhaustion', label: 'Exhaustion' },
    ],
  },
  // Q4
  {
    id: 'health-objective',
    type: 'single',
    question: 'What is your primary health objective right now?',
    category: 'goals',
    options: [
      { id: 'vitality', label: 'Sustainable vitality and energy' },
      { id: 'clarity', label: 'Sharp mental clarity and focus' },
      { id: 'weight', label: 'Losing midlife weight without cardio' },
      { id: 'aging', label: 'Graceful aging and resilience' },
      { id: 'body-mind', label: 'A body and mind I can rely on' },
    ],
  },
  // Q5
  {
    id: 'body-mind-rebuild',
    type: 'multi',
    question: "What would 'Body Mind Rebuild' allow you to do?",
    subtitle: 'Select all that apply',
    category: 'goals',
    options: [
      { id: 'family', label: 'Be fully present with my family' },
      { id: 'professional', label: 'Lead with my professional edge' },
      { id: 'morning', label: 'Wake up feeling ahead of the day' },
      { id: 'body', label: 'Build a body and mind I can rely on' },
      { id: 'self-care', label: 'Better care for my own needs' },
    ],
  },
  // Q6
  {
    id: 'burnout-urgency',
    type: 'scale',
    question: 'How critical is it to end the burnout cycle right now?',
    scaleLabels: { low: 'Nice to have', high: 'Critical priority' },
    category: 'urgency',
  },
  // Q7
  {
    id: 'readiness',
    type: 'single',
    question: 'When are you ready to implement a decision-free system?',
    category: 'urgency',
    options: [
      { id: 'immediately', label: 'Immediately' },
      { id: '30days', label: 'Within 30 days' },
      { id: '90days', label: 'Within 90 days' },
      { id: 'exploring', label: 'Just exploring' },
    ],
  },
  // Q8
  {
    id: 'ideal-future',
    type: 'single',
    question: 'In an ideal world, where would you be with your health 12 months from now?',
    category: 'goals',
    options: [
      { id: 'in-control', label: 'Feeling in control of my health' },
      { id: 'energised', label: 'Waking up feeling energised' },
      { id: 'confident', label: 'Feeling comfortable and confident in my own skin' },
      { id: 'balance', label: 'A better work-life balance' },
      { id: 'exercising', label: 'Exercising regularly' },
      { id: 'emotions', label: 'Feeling in control of my emotions' },
    ],
  },
  // Q9
  {
    id: 'success-metric',
    type: 'single',
    question: "How would you know you've succeeded?",
    category: 'success',
    options: [
      { id: 'weight-target', label: 'Hit a specific body weight target' },
      { id: 'mirror', label: 'Proud of myself when I look in the mirror' },
      { id: 'energy', label: 'Having sustained energy throughout the day' },
      { id: 'habits', label: 'Healthy habits running on autopilot' },
      { id: 'confident-control', label: 'Feeling confident and in control' },
    ],
  },
  // Q10
  {
    id: 'commitment',
    type: 'scale',
    question: 'How committed are you to achieving this goal?',
    scaleLabels: { low: 'Thinking about it', high: 'Fully committed' },
    category: 'urgency',
  },
  // Contact — kept separate at end
  {
    id: 'email',
    type: 'email',
    question: 'Where should we send your personalised results?',
    subtitle: 'Enter your email to receive your wellness profile and recommendations',
  },
]

export default function WellnessQuiz() {
  const [started, setStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [email, setEmail] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [selectedMulti, setSelectedMulti] = useState<string[]>([])

  const question = QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100

  // Landing/Start Screen
  if (!started) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              Free 2-minute assessment
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight max-w-xl mx-auto">
              How Many More Years Will You Spend Feeling Like This?
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Answer 10 honest questions and walk away with a personalised breakdown of what's draining you, why it's happening, and the exact shift that will get you unstuck.
            </p>

            {/* What You'll Get */}
            <div className="bg-white rounded-3xl p-8 mb-8 text-left border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-400 mb-6 tracking-wide">In the next 2 minutes, you'll discover:</p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Exactly where you're leaking energy — and why willpower isn't the problem</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Which of the 4 wellness pillars is quietly sabotaging everything else</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">The single shift that will create the fastest change for your body</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => setStarted(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Start My Assessment
            </motion.button>

            {/* Trust indicators */}
            <p className="text-sm text-gray-400 mt-6">
              ✓ Free &nbsp;·&nbsp; ✓ Private &nbsp;·&nbsp; ✓ Takes 2 minutes
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({ ...prev, [question.id]: answer }))
    
    // Auto-advance for single choice and scale
    if (question.type === 'single' || question.type === 'scale') {
      setTimeout(() => nextStep(), 300)
    }
  }

  const handleMultiSelect = (optionId: string) => {
    setSelectedMulti(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const nextStep = () => {
    if (question.type === 'multi') {
      setAnswers(prev => ({ ...prev, [question.id]: selectedMulti }))
      setSelectedMulti([])
    }
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    setAnswers(prev => ({ ...prev, email }))
    setIsComplete(true)
    console.log('Quiz completed:', { ...answers, email })
  }

  // Results page
  if (isComplete) {
    return <ResultsPage answers={answers} email={email} />
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Progress Bar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`p-2 rounded-full ${currentStep === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 flex gap-1">
              {QUESTIONS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    idx <= currentStep ? 'bg-gray-800' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Question */}
              <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3 leading-relaxed">
                {question.question}
              </h1>
              {question.subtitle && (
                <p className="text-gray-500 mb-8">
                  {question.subtitle}
                </p>
              )}

              {/* Answer Options */}
              <div className="mt-8">
                {question.type === 'single' && (
                  <div className="space-y-3 text-left">
                    {question.options?.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                          answers[question.id] === option.id
                            ? 'border-gray-800 bg-gray-800 text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        {answers[question.id] === option.id && (
                          <svg className="w-5 h-5 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'multi' && (
                  <div className="space-y-3">
                    {question.options?.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleMultiSelect(option.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                          selectedMulti.includes(option.id)
                            ? 'border-gray-800 bg-gray-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{option.icon}</span>
                        <span className="text-gray-700 font-medium">{option.label}</span>
                        {selectedMulti.includes(option.id) && (
                          <svg className="w-5 h-5 ml-auto text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                    <button
                      onClick={nextStep}
                      disabled={selectedMulti.length === 0}
                      className={`w-full mt-6 py-4 rounded-2xl font-semibold transition-all ${
                        selectedMulti.length > 0
                          ? 'bg-gray-800 text-white hover:bg-gray-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}

                {question.type === 'scale' && (
                  <div className="px-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-6">
                      <span>{question.scaleLabels?.low}</span>
                      <span>{question.scaleLabels?.high}</span>
                    </div>
                    {/* Mobile: 5 per row */}
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:gap-2 sm:justify-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button
                          key={num}
                          onClick={() => handleAnswer(num)}
                          className={`aspect-square sm:w-11 sm:h-11 rounded-xl border-2 font-semibold text-sm sm:text-base transition-all ${
                            answers[question.id] === num
                              ? 'border-gray-800 bg-gray-800 text-white'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 active:scale-95'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === 'email' && (
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 text-lg text-center focus:outline-none focus:border-gray-400"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!email || !email.includes('@')}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                        email && email.includes('@')
                          ? 'bg-gray-800 text-white hover:bg-gray-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      See My Results
                    </button>
                    <p className="text-sm text-gray-400">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Results Page Component
function ResultsPage({ answers, email }: { answers: Record<string, any>; email: string }) {
  // Calculate urgency & commitment scores
  const urgencyScore: number = answers['burnout-urgency'] || 5
  const commitmentScore: number = answers['commitment'] || 5
  const overallScore = Math.round((urgencyScore + commitmentScore) / 2)

  // Build symptom list from multi-select
  const symptomLabels: Record<string, string> = {
    'brain-fog': 'Brain fog and memory lapses',
    'motivation': 'Lack of motivation',
    'joint-pain': 'Joint pain or physical fragility',
    'excess-weight': 'Carrying excess body weight',
    'overwhelm': 'Overwhelm',
    'exhaustion': 'Exhaustion',
  }
  const symptoms: string[] = (answers['symptoms'] || []).map((s: string) => symptomLabels[s]).filter(Boolean)

  // Determine profile based on energy + obstacle answers
  const energyAnswer = answers['daily-energy']
  const obstacleAnswer = answers['consistency-obstacle']

  let profile = {
    title: 'The Awakening',
    description: 'You sense something needs to change. The sluggish mornings, the afternoon crashes, the feeling that your body isn\'t quite working with you anymore. You\'re not broken. You\'re just ready to stop settling for "fine."',
  }

  if (energyAnswer === 'fumes' || energyAnswer === 'behind') {
    profile = {
      title: 'The Exhausted Achiever',
      description: 'You\'re doing everything right on paper — working hard, showing up, pushing through. But underneath it all, you\'re running on fumes. The alarm goes off and you already feel behind. Coffee gets you moving, but the real energy never comes. You know this isn\'t sustainable.',
    }
  } else if (energyAnswer === 'crash') {
    profile = {
      title: 'The Morning-Crash Cycle',
      description: 'You start strong — there\'s even a window of real momentum. But by midday, it\'s gone. Then comes the guilt of not doing more with it. This cycle isn\'t a discipline problem. It\'s a systems problem. And it\'s fixable.',
    }
  } else if (obstacleAnswer === 'overwhelm' || obstacleAnswer === 'willpower') {
    profile = {
      title: 'The Overwhelmed Starter',
      description: 'You\'ve started more times than you can count. The motivation shows up, you make a plan, maybe even see some progress — then life happens. It\'s not that you don\'t know what to do. It\'s that nothing has stuck. That\'s not a you problem. That\'s a system problem.',
    }
  } else if (obstacleAnswer === 'family') {
    profile = {
      title: 'The Sandwich Generation Warrior',
      description: 'You\'re pulled in every direction — career, kids, ageing parents, your own health. Everyone else comes first. By the time you get to yourself, there\'s nothing left. The hard truth: you can\'t pour from an empty cup. Your health has to be part of the plan, not an afterthought.',
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 mb-2">Your Wellness Profile</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-4">
            {profile.title}
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            {profile.description}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-gray-800">{overallScore}<span className="text-lg text-gray-400">/10</span></span>
            </div>
            <p className="text-gray-500">Your Readiness Score</p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Urgency', value: urgencyScore },
              { label: 'Commitment', value: commitmentScore },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <span className="w-24 text-sm text-gray-500">{label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value * 10}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      value <= 4 ? 'bg-rose-400' : value <= 6 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                </div>
                <span className="w-6 text-sm font-medium text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Symptoms You Shared */}
        {symptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
          >
            <h2 className="text-xl font-serif text-gray-900 mb-2">What You Shared With Us</h2>
            <p className="text-sm text-gray-500 mb-6">Current symptoms you identified:</p>
            <div className="space-y-3">
              {symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-rose-500 text-xs">✕</span>
                  </div>
                  <p className="text-gray-700">{symptom}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* What's Possible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
        >
          <h2 className="text-xl font-serif text-gray-900 mb-2">What's Possible For You</h2>
          <p className="text-sm text-gray-500 mb-6">Imagine 90 days from now...</p>
          <div className="space-y-3">
            {[
              'Waking up naturally with energy that lasts all day',
              'A body and mind working together, not against you',
              'Healthy habits running on autopilot — no willpower required',
              'Feeling comfortable and confident in your own skin again',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-500 text-xs">✓</span>
                </div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA - Book a Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white mb-6"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-serif mb-4">Let's Talk Through Your Results</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Book a free 20-minute call where we'll go through your answers together, explore what's been holding you back, and map out a clear path forward.
            </p>
            <p className="text-gray-500 text-sm mb-6">No pressure. No pitch. Just clarity.</p>
            <a 
              href="#book" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Your Free Discovery Call
            </a>
          </div>
        </motion.div>

        {/* What Happens on the Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8"
        >
          <h2 className="text-xl font-serif text-gray-900 mb-6">What Happens on the Call</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">1</div>
              <div>
                <h3 className="font-medium text-gray-900">Review Your Answers</h3>
                <p className="text-sm text-gray-500">We'll look at what you shared and dig deeper into what's really going on</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">2</div>
              <div>
                <h3 className="font-medium text-gray-900">Identify the Root Cause</h3>
                <p className="text-sm text-gray-500">Understand what's actually been holding you back (it's often not what you think)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">3</div>
              <div>
                <h3 className="font-medium text-gray-900">Map Your Next Steps</h3>
                <p className="text-sm text-gray-500">Leave with clarity on exactly what to do next, whether we work together or not</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm">
          Your results have been sent to {email}
        </p>
      </div>
    </div>
  )
}
