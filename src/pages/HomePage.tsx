import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Gift, 
  Trophy, 
  Users, 
  ArrowRight,
  Star,
  Zap,
  Shield,
  HelpCircle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook
} from 'lucide-react'
import { Link } from 'react-router-dom'
import LegalLinks from '../components/LegalLinks'
import SupportResources from '../components/SupportResources'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Earn Points Easily',
      description: 'Play games, complete quizzes, and finish simple tasks to earn points quickly.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Gift,
      title: 'Premium Subscriptions',
      description: 'Redeem your points for Netflix, YouTube Premium, Spotify, and many more services.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Users,
      title: 'Referral Program',
      description: 'Invite friends and earn commission on all their points with our 3-tier referral system.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Zap,
      title: 'Daily Rewards',
      description: 'Come back daily for free spins, scratch cards, and bonus point opportunities.',
      color: 'from-yellow-400 to-yellow-600'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah J.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'I\'ve earned enough points for 6 months of Netflix Premium in just two weeks! The games are actually fun to play too.',
      service: 'Netflix'
    },
    {
      name: 'Michael T.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The referral system is amazing. I invited 5 friends and now I\'m earning passive points every day from their activities.',
      service: 'Spotify Premium'
    },
    {
      name: 'Priya K.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Customer support is fantastic! Had an issue with my redemption and they resolved it within hours.',
      service: 'YouTube Premium'
    }
  ]

  const stats = [
    { 
      label: 'Active Users', 
      value: '50K+',
      icon: Users,
      color: 'text-blue-400'
    },
    { 
      label: 'Subscriptions Given', 
      value: '25K+',
      icon: Gift,
      color: 'text-purple-400'
    },
    { 
      label: 'Points Distributed', 
      value: '1M+',
      icon: Zap,
      color: 'text-yellow-400'
    },
    { 
      label: 'Happy Members', 
      value: '95%',
      icon: CheckCircle,
      color: 'text-green-400'
    }
  ]

  const subscriptions = [
    { name: 'Netflix', logo: '🎬', color: 'from-red-500 to-red-600' },
    { name: 'YouTube Premium', logo: '📺', color: 'from-red-600 to-red-700' },
    { name: 'Amazon Prime', logo: '📦', color: 'from-blue-500 to-blue-600' },
    { name: 'Disney+ Hotstar', logo: '⭐', color: 'from-blue-600 to-indigo-600' },
    { name: 'Spotify', logo: '🎵', color: 'from-green-500 to-green-600' },
    { name: 'Apple Music', logo: '🎶', color: 'from-gray-700 to-gray-800' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-20 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-60 right-40 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div 
              className="flex justify-center mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
            >
              <motion.img 
                src="https://i.ibb.co/99y0NdZb/Premium-Access-Zone-LOGO.png" 
                alt="Premium Access Zone" 
                className="h-24 w-auto md:h-28"
                whileHover={{ 
                  rotate: [0, 5, -5, 0],
                  scale: 1.05
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-white">Get </span>
              <motion.span 
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Premium Services
              </motion.span>
              <span className="text-white"> For </span>
              <motion.span 
                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                Free
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.span
                animate={{
                  color: ['rgb(229, 231, 235)', 'rgb(255, 255, 255)', 'rgb(229, 231, 235)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Earn points through fun games and simple tasks, then redeem them for 
                Netflix, YouTube Premium, Spotify, and more — all without spending a penny.
              </motion.span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <Link to="/register" className="block">
                  <div className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl text-lg shadow-xl hover:shadow-yellow-500/25 transition-all duration-300">
                    <motion.div 
                      className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        boxShadow: ['0 0 0px rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.5)', '0 0 0px rgba(234, 179, 8, 0)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="flex items-center gap-2 relative z-10">
                      Get Started Free
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </span>
                  </div>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                <Link to="/login" className="block">
                  <div className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 text-white font-bold rounded-xl text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <span className="flex items-center gap-2">
                      Sign In
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative -mt-16 sm:-mt-20"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center flex flex-col items-center"
                >
                  <motion.div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-3 ${stat.color} bg-white/10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + index * 0.1
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                animate={{ 
                  color: ['rgb(255, 255, 255)', 'rgb(191, 219, 254)', 'rgb(255, 255, 255)']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                How It Works
              </motion.h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Earn points and redeem them for premium subscriptions in four simple steps
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                step: 1, 
                title: "Sign Up", 
                description: "Create your free account and get 100 welcome points",
                icon: Users,
                color: "from-blue-400 to-blue-600"
              },
              { 
                step: 2, 
                title: "Earn Points", 
                description: "Play games, complete tasks, and participate in activities",
                icon: Trophy,
                color: "from-green-400 to-green-600"
              },
              { 
                step: 3, 
                title: "Choose Rewards", 
                description: "Browse available premium subscriptions in our catalog",
                icon: Gift,
                color: "from-purple-400 to-purple-600"
              },
              { 
                step: 4, 
                title: "Redeem & Enjoy", 
                description: "Get activation codes and enjoy premium services",
                icon: Sparkles,
                color: "from-yellow-400 to-yellow-600"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full hover:border-white/40 transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <motion.div 
                    className="absolute -top-5 -left-5 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    animate={{
                      boxShadow: ['0 0 0px rgba(79, 70, 229, 0)', '0 0 15px rgba(79, 70, 229, 0.5)', '0 0 0px rgba(79, 70, 229, 0)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 5 }}
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
                
                {/* Connector line between steps (except last) */}
                {index < 3 && (
                  <motion.div 
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20"
                    animate={{
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    ></motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Available Subscriptions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-b from-black/10 via-indigo-950/20 to-black/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                animate={{ 
                  color: ['rgb(255, 255, 255)', 'rgb(216, 180, 254)', 'rgb(255, 255, 255)']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                Premium Subscriptions
              </motion.h2>
              <p className="text-xl text-gray-300">
                Redeem your points for these popular streaming services
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {subscriptions.map((sub, index) => (
              <motion.div
                key={sub.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5, rotateZ: 2 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${sub.color} p-5 sm:p-6 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/10 relative overflow-hidden`}>
                  {/* Animated background glow */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      background: [
                        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl sm:text-4xl mb-2 sm:mb-3"
                      animate={{ 
                        y: [0, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: index
                      }}
                    >
                      {sub.logo}
                    </motion.div>
                    <div className="text-white font-bold text-base sm:text-lg">{sub.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold rounded-xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden group"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    View All Subscriptions
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                animate={{ 
                  color: ['rgb(255, 255, 255)', 'rgb(147, 197, 253)', 'rgb(255, 255, 255)']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                Why Choose Us
              </motion.h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We make earning and redeeming points simple, fun, and rewarding
              </p>
            </motion.div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.5
                      }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Decorative corner element */}
                  <motion.div 
                    className="absolute top-0 right-0 w-12 h-12 overflow-hidden"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 bg-white/5 rotate-45"
                      animate={{ rotate: [45, 55, 45] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-b from-black/10 via-purple-950/20 to-black/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                animate={{ 
                  color: ['rgb(255, 255, 255)', 'rgb(196, 181, 253)', 'rgb(255, 255, 255)']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                What Our Users Say
              </motion.h2>
              <p className="text-xl text-gray-300">
                Join thousands of satisfied members already enjoying premium services
              </p>
            </motion.div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative"
              >
                {/* Quote mark decoration */}
                <motion.div 
                  className="absolute top-4 right-4 text-4xl text-white/10 font-serif"
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  "
                </motion.div>
                
                <div className="mb-4">
                  <p className="text-gray-300 italic relative z-10">"{testimonial.text}"</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden"
                  >
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-cyan-400 text-sm">Redeemed: {testimonial.service}</p>
                  </div>
                </div>
                
                {/* Star rating */}
                <motion.div 
                  className="absolute bottom-4 right-4 flex"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.1 + index * 0.1
                      }}
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-blue-400/30 shadow-xl relative overflow-hidden"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.4)"
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-10 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-400/15 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
            
            <div className="relative z-10">
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(79, 70, 229, 0)', '0 0 20px rgba(79, 70, 229, 0.6)', '0 0 0px rgba(79, 70, 229, 0)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 180],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{
                    color: ['rgb(255, 255, 255)', 'rgb(186, 230, 253)', 'rgb(255, 255, 255)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Join 50,000+ Happy Members
                </motion.span>
              </motion.h2>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Start earning points today and unlock your first premium subscription within hours!
              </motion.p>
              
              <motion.div 
                className="flex items-center justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Shield className="h-6 w-6 text-green-400" />
                </motion.div>
                <motion.span 
                  className="text-green-400 font-medium"
                  animate={{ 
                    color: ['rgb(74, 222, 128)', 'rgb(134, 239, 172)', 'rgb(74, 222, 128)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  100% Free & Secure
                </motion.span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex items-center gap-2 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl text-lg sm:text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 2
                      }}
                    />
                    <span className="relative z-10">Start Earning Now</span>
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-sm border-t border-white/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
            <div className="lg:col-span-1">
              <div 
                className="flex items-center gap-3 mb-5"
                whileHover={{ x: 5 }}
              >
                <motion.img 
                  src="https://i.ibb.co/99y0NdZb/Premium-Access-Zone-LOGO.png" 
                  alt="Premium Access Zone" 
                  className="h-10 sm:h-12 w-auto"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <h3 className="text-lg sm:text-xl font-bold text-white">Premium<br/>Access Zone</h3>
              </div>
              <p className="text-gray-400 mb-5 leading-relaxed">
                Unlock premium subscriptions through simple tasks and games.
              </p>
              <motion.div 
                className="flex items-center gap-2"
                animate={{ 
                  x: [0, 3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Shield className="h-5 w-5 text-cyan-400" />
                </motion.div>
                <span className="text-cyan-400 font-medium">Trusted by 50,000+ users</span>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-cyan-300"
                    >
                      Home
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-cyan-300"
                    >
                      Sign In
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-cyan-300"
                    >
                      Register
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-cyan-300"
                    >
                      Support
                    </motion.span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-5">Features</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/games" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-purple-300"
                    >
                      Games
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/tasks" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-purple-300"
                    >
                      Tasks
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/rewards" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-purple-300"
                    >
                      Rewards
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <motion.span
                      whileHover={{ x: 2 }}
                      className="group-hover:text-purple-300"
                    >
                      Transactions
                    </motion.span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-5">Contact Us</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Mail className="h-5 w-5 text-gray-400" />
                  </motion.div>
                  <a href="mailto:support@premiumaccesszone.com" className="hover:text-white hover:text-cyan-300 transition-colors">
                    support@premiumaccesszone.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Phone className="h-5 w-5 text-gray-400" />
                  </motion.div>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <motion.div
                    animate={{ 
                      y: [0, 2, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-1"
                  >
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </motion.div>
                  <span>123 Digital Street<br/>Internet City, 10001</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  <Facebook className="h-5 w-5 text-white" />
                </motion.div>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <Twitter className="h-5 w-5 text-white" />
                </motion.div>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <Instagram className="h-5 w-5 text-white" />
                </motion.div>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </motion.div>
              </motion.a>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <motion.p 
              className="text-gray-400 text-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              &copy; 2025 Premium Access Zone. All rights reserved.
            </motion.p>
            <LegalLinks linkClassName="text-sm hover:text-cyan-300 transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage