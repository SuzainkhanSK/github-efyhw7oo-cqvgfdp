import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Coins, 
  History, 
  Info, 
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Eye,
  Award,
  TrendingUp,
  Video,
  Zap,
  X,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

interface AdViewLimit {
  ads_viewed: number
  max_daily_ads: number
  remaining: number
  can_view_more: boolean
}

interface AdViewHistory {
  id: string
  task_id: string
  provider: string
  status: 'pending' | 'completed' | 'failed' | 'reviewing'
  coins_earned: number
  completed_at: string
  created_at: string
}

interface AdVideo {
  id: string
  title: string
  duration: number
  provider: string
  thumbnail: string
  videoUrl: string
}

const WatchAdsPage: React.FC = () => {
  const { user, userProfile, refreshProfile } = useAuth()
  const [adLimit, setAdLimit] = useState<AdViewLimit | null>(null)
  const [adHistory, setAdHistory] = useState<AdViewHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [watchingAd, setWatchingAd] = useState(false)
  const [currentAd, setCurrentAd] = useState<AdVideo | null>(null)
  const [adProgress, setAdProgress] = useState(0)
  const [adCompleted, setAdCompleted] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [processingReward, setProcessingReward] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressInterval = useRef<number | null>(null)

  // Sample ad videos (in a real implementation, these would come from an ad provider)
  const adVideos: AdVideo[] = [
    {
      id: 'ad1',
      title: 'Premium Smartphone - Latest Model',
      duration: 30,
      provider: 'AdsTerra',
      thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    },
    {
      id: 'ad2',
      title: 'Luxury Car - Drive Your Dreams',
      duration: 15,
      provider: 'AdsTerra',
      thumbnail: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    },
    {
      id: 'ad3',
      title: 'Summer Vacation Deals',
      duration: 20,
      provider: 'AdsTerra',
      thumbnail: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    },
    {
      id: 'ad4',
      title: 'Online Learning Platform',
      duration: 25,
      provider: 'AdsTerra',
      thumbnail: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    },
    {
      id: 'ad5',
      title: 'Fitness App Subscription',
      duration: 15,
      provider: 'AdsTerra',
      thumbnail: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    }
  ]

  useEffect(() => {
    if (user?.id) {
      checkAdLimit()
      fetchAdHistory()
      
      // Check if user is new and show tutorial
      const hasSeenTutorial = localStorage.getItem('watchAdsTutorialSeen')
      if (!hasSeenTutorial) {
        setShowTutorial(true)
      }
    }
  }, [user])

  const checkAdLimit = async () => {
    if (!user?.id || !isSupabaseConfigured) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.rpc('check_daily_ad_view_limit', {
        user_id_param: user.id
      })

      if (error) throw error
      setAdLimit(data)
    } catch (error) {
      console.warn('Failed to check ad limit:', error)
      // Fallback to default values
      setAdLimit({
        ads_viewed: 0,
        max_daily_ads: 10,
        remaining: 10,
        can_view_more: true
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchAdHistory = async () => {
    if (!user?.id || !isSupabaseConfigured) return

    try {
      const { data, error } = await supabase
        .from('earning_task_completions')
        .select('*')
        .eq('user_id', user.id)
        .like('task_id', 'ad_view%')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setAdHistory(data || [])
    } catch (error) {
      console.warn('Failed to fetch ad history:', error)
    }
  }

  const startWatchingAd = () => {
    if (!adLimit?.can_view_more) {
      toast.error('You have reached your daily ad limit')
      return
    }

    // Select a random ad
    const randomIndex = Math.floor(Math.random() * adVideos.length)
    const selectedAd = adVideos[randomIndex]
    
    setCurrentAd(selectedAd)
    setWatchingAd(true)
    setAdProgress(0)
    setAdCompleted(false)
    
    // Start progress tracking
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    
    progressInterval.current = window.setInterval(() => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setAdProgress(progress)
        
        // Mark as completed when reaching 90% (to account for potential buffering issues)
        if (progress >= 90 && !adCompleted) {
          setAdCompleted(true)
          clearInterval(progressInterval.current!)
          progressInterval.current = null
        }
      }
    }, 500) as unknown as number
  }

  const handleVideoEnded = () => {
    setAdCompleted(true)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  const closeAdPlayer = () => {
    setWatchingAd(false)
    setCurrentAd(null)
    setAdProgress(0)
    setAdCompleted(false)
    
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  const claimAdReward = async () => {
    if (!user?.id || !currentAd || !adCompleted || !isSupabaseConfigured) return

    setProcessingReward(true)
    
    try {
      // Generate a unique task ID for this ad view
      const taskId = `ad_view_${uuidv4().substring(0, 8)}`
      
      // Call the edge function to verify the ad view
      const verifyResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-ad-view`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          adId: currentAd.id,
          provider: currentAd.provider,
          duration: currentAd.duration,
          taskId: taskId
        })
      })
      
      if (!verifyResponse.ok) {
        throw new Error('Failed to verify ad view')
      }
      
      const verificationData = await verifyResponse.json()
      
      // Process the ad view completion
      const { data, error } = await supabase.rpc('process_ad_view_completion', {
        user_id_param: user.id,
        task_id_param: taskId,
        provider_param: currentAd.provider,
        verification_data_param: verificationData
      })

      if (error) throw error
      
      if (data.success) {
        toast.success(`🎉 You earned ${data.points_earned} points!`)
        
        // Update local state
        await Promise.all([
          refreshProfile(),
          checkAdLimit(),
          fetchAdHistory()
        ])
        
        closeAdPlayer()
      } else {
        toast.error(data.message || 'Failed to process ad view')
      }
    } catch (error: any) {
      console.error('Failed to claim ad reward:', error)
      toast.error(error.message || 'Failed to claim reward')
    } finally {
      setProcessingReward(false)
    }
  }

  const getPointsForNextAd = (): number => {
    if (!adLimit) return 50
    
    const adsViewed = adLimit.ads_viewed
    
    if (adsViewed >= 7) return 100 // 8-10 ads: 100 points each
    if (adsViewed >= 4) return 75  // 5-7 ads: 75 points each
    if (adsViewed >= 2) return 60  // 3-4 ads: 60 points each
    return 50                      // 1-2 ads: 50 points each
  }

  const getTimeUntilReset = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const diff = tomorrow.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Watch Ads & Earn
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Watch video ads to earn points daily - the more you watch, the more you earn!
        </p>
        
        {/* Ad Limit Info */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-400" />
              <span className="text-white font-medium">
                {adLimit ? `${adLimit.ads_viewed}/${adLimit.max_daily_ads} ads watched today` : 'Loading...'}
              </span>
            </div>
            {adLimit && adLimit.remaining === 0 && (
              <p className="text-gray-400 text-sm mt-1">
                Resets in {getTimeUntilReset()}
              </p>
            )}
          </div>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-white" />
            ) : (
              <VolumeX className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <button
            onClick={() => setShowTutorial(true)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors"
          >
            <Info className="h-5 w-5 text-white" />
          </button>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors"
          >
            <History className="h-5 w-5 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Ad History */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="h-5 w-5 text-orange-400" />
                Your Ad History
              </h3>
              <button
                onClick={() => fetchAdHistory()}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            
            {adHistory.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {adHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                        <Video className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {entry.task_id.replace('ad_view_', 'Ad View #')}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {new Date(entry.completed_at || entry.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-green-400 font-bold">+{entry.coins_earned}</p>
                      <p className="text-gray-400 text-xs">{entry.provider}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No ad history yet</p>
                <p className="text-gray-500 text-sm">Watch ads to earn points and see your history here</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ad Player Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            {watchingAd && currentAd ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{currentAd.title}</h3>
                  <button
                    onClick={closeAdPlayer}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    src={currentAd.videoUrl}
                    className="w-full h-full"
                    controls={false}
                    autoPlay
                    muted={!soundEnabled}
                    onEnded={handleVideoEnded}
                  />
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div 
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${adProgress}%` }}
                    />
                  </div>
                  
                  {/* Ad Provider Badge */}
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {currentAd.provider}
                  </div>
                </div>
                
                {/* Ad Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {adCompleted ? 'Ad Completed!' : 'Watching Ad...'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {adCompleted ? 'You can now claim your reward' : `${Math.round(adProgress)}% complete`}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={claimAdReward}
                    disabled={!adCompleted || processingReward}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      adCompleted && !processingReward
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {processingReward ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Coins className="h-5 w-5" />
                        Claim {getPointsForNextAd()} Points
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Watch Video Ads to Earn Points</h3>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                  Each ad you watch earns you points. The more ads you watch, the more points you earn per ad!
                </p>
                
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-8 inline-block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <Coins className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Next ad reward:</p>
                      <p className="text-green-400 text-2xl font-bold">{getPointsForNextAd()} points</p>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={startWatchingAd}
                  disabled={loading || (adLimit && !adLimit.can_view_more)}
                  whileHover={{ scale: adLimit?.can_view_more ? 1.05 : 1 }}
                  whileTap={{ scale: adLimit?.can_view_more ? 0.95 : 1 }}
                  className={`px-8 py-4 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300 ${
                    loading
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : adLimit?.can_view_more
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/25'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Loading...
                    </div>
                  ) : adLimit?.can_view_more ? (
                    <div className="flex items-center gap-2">
                      <Play className="h-6 w-6" />
                      Watch Ad Now
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Daily Limit Reached
                    </div>
                  )}
                </motion.button>
                
                {adLimit && !adLimit.can_view_more && (
                  <p className="text-gray-400 text-sm mt-4">
                    You've watched all {adLimit.max_daily_ads} ads for today. Come back tomorrow for more!
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reward Tiers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              Reward Tiers
            </h3>
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border transition-colors ${
                adLimit && adLimit.ads_viewed < 2 
                  ? 'bg-white/20 border-yellow-400/50' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 font-bold">1-2</span>
                    </div>
                    <span className="text-white">First Ads</span>
                  </div>
                  <span className="text-yellow-400 font-bold">50 points</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border transition-colors ${
                adLimit && adLimit.ads_viewed >= 2 && adLimit.ads_viewed < 4
                  ? 'bg-white/20 border-green-400/50' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">3-4</span>
                    </div>
                    <span className="text-white">Bronze Tier</span>
                  </div>
                  <span className="text-green-400 font-bold">60 points</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border transition-colors ${
                adLimit && adLimit.ads_viewed >= 4 && adLimit.ads_viewed < 7
                  ? 'bg-white/20 border-blue-400/50' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 font-bold">5-7</span>
                    </div>
                    <span className="text-white">Silver Tier</span>
                  </div>
                  <span className="text-blue-400 font-bold">75 points</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border transition-colors ${
                adLimit && adLimit.ads_viewed >= 7
                  ? 'bg-white/20 border-purple-400/50' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 font-bold">8-10</span>
                    </div>
                    <span className="text-white">Gold Tier</span>
                  </div>
                  <span className="text-purple-400 font-bold">100 points</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Today's Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Today's Progress
            </h3>
            
            {adLimit ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Ads Watched</span>
                  <span className="text-white font-bold">{adLimit.ads_viewed}/{adLimit.max_daily_ads}</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(adLimit.ads_viewed / adLimit.max_daily_ads) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">0</span>
                  <span className="text-gray-400">{adLimit.max_daily_ads / 2}</span>
                  <span className="text-gray-400">{adLimit.max_daily_ads}</span>
                </div>
                
                <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Total Potential Today</p>
                      <p className="text-blue-400 font-bold">
                        {adLimit.remaining * getPointsForNextAd() + adHistory.reduce((sum, ad) => sum + ad.coins_earned, 0)} points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <RefreshCw className="h-6 w-6 text-blue-400 animate-spin" />
              </div>
            )}
          </motion.div>

          {/* Recent Earnings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              Recent Earnings
            </h3>
            
            {adHistory.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {adHistory.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">
                        {entry.task_id.replace('ad_view_', 'Ad #')}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(entry.completed_at || entry.created_at).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-green-400 font-bold">
                      +{entry.coins_earned}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No earnings yet today</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Info className="h-6 w-6 text-orange-400" />
          How Watch & Earn Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Watch Video Ads</h3>
            <p className="text-gray-300 text-sm">Watch short video advertisements from our partners</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Complete the Ad</h3>
            <p className="text-gray-300 text-sm">Watch the full ad to qualify for points</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Claim Your Points</h3>
            <p className="text-gray-300 text-sm">Points are instantly added to your account</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Earn More Daily</h3>
            <p className="text-gray-300 text-sm">Watch up to 10 ads per day for maximum earnings</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-orange-400/20 rounded-xl border border-orange-400/30">
          <p className="text-orange-300 text-sm">
            <strong>💡 Pro Tip:</strong> The more ads you watch in a day, the more points you earn per ad! 
            Watch all 10 daily ads to maximize your earnings with our tiered reward system.
          </p>
        </div>
      </motion.div>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTutorial(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-lg w-full"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Info className="h-6 w-6 text-orange-400" />
                How to Earn with Video Ads
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <p>You can watch up to 10 video ads per day</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <p>Each ad must be watched completely to earn points</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <p>The more ads you watch, the more points you earn per ad:</p>
                </div>
                <div className="ml-9 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>First 2 ads: 50 points each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    <span>3-4 ads: 60 points each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>5-7 ads: 75 points each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>8-10 ads: 100 points each</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <p>Your daily limit resets at midnight</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-400/20 rounded-xl border border-orange-400/30">
                <p className="text-orange-300 text-sm font-medium">
                  💡 Watching all 10 ads daily can earn you up to 775 points per day!
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowTutorial(false)
                  localStorage.setItem('watchAdsTutorialSeen', 'true')
                }}
                className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WatchAdsPage