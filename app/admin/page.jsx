"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Palette, DollarSign, TrendingUp, Settings, Shield, Database, Activity, UserCheck, UserX, Ban, Eye, EyeOff, Search, Filter, Download, Upload, Trash2, Edit, CheckCircle, XCircle, Clock, Star, Heart, MessageSquare, Calendar, BarChart3, PieChart, LineChart, RefreshCw, AlertTriangle, CheckCircle2, Server, HardDrive, Cpu, Wifi, Lock, Unlock, Key, Timer, Zap, Globe, Mail, Bell, FileText, ImageIcon, Video, MouseIcon as Mu, Archive, DatabaseBackupIcon as Backup, CloudUpload, CloudDownload, MonitorSpeaker, Headphones, Smartphone, Tablet, Laptop, ComputerIcon as Desktop, Gamepad2, Camera, Mic, Speaker, Volume2, VolumeX, Play, Pause, CircleStopIcon as Stop, SkipForward, SkipBack, Repeat, Shuffle, Radio, Tv, Film, BookOpen, Bookmark, Tag, Tags, Flag, MapPin, Navigation, Compass, Map, Route, Car, Plane, Train, Bus, Bike, FootprintsIcon as Walk, Home, Building, Store, Factory, Warehouse, School, Hospital, Church, BanknoteIcon as Bank, Hotel, MenuIcon as Restaurant, CoffeeIcon as Cafe, ShoppingCart, ShoppingBag, CreditCard, Wallet, Coins, Receipt, Calculator, TrendingDown, BarChart, BarChart2, BarChart4, AreaChartIcon as Area, ScatterChartIcon as Scatter, Target, Award, Trophy, Medal, Crown, Gem, Diamond, Sparkles, Flame, CloudLightningIcon as Lightning, Sun, Moon, Cloud, CloudRain, CloudSnow, Umbrella, Rainbow, Thermometer, Wind, Tornado, BombIcon as Volcano, Mountain, TreesIcon as Tree, Flower, Leaf, SproutIcon as Seedling, CitrusIcon as Cactus, TreeDeciduousIcon as Evergreen, TreeDeciduousIcon as Deciduous, Bug, FlowerIcon as Butterfly, Bird, Fish, Rabbit, Turtle, SnailIcon as Snake, BirdIcon as Dragon, RainbowIcon as Unicorn, DogIcon as Horse, MilkIcon as Cow, PiggyBankIcon as Pig, WheatIcon as Sheep, GrapeIcon as Goat, Dog, Cat, Mouse, HamIcon as Hamster, BeakerIcon as Bear, PiIcon as Panda, RabbitIcon as Koala, TurtleIcon as Tiger, LassoIcon as Lion, EraserIcon as Elephant, BirdIcon as Giraffe, BarcodeIcon as Zebra, RabbitIcon as Deer, RabbitIcon as Kangaroo, MoonIcon as Monkey, GroupIcon as Gorilla, SnailIcon as Sloth, HopIcon as Hippo, SnailIcon as Crocodile, PiIcon as Penguin, BirdIcon as Owl, BirdIcon as Eagle, RabbitIcon as Duck, SwatchBookIcon as Swan, FlameIcon as Flamingo, FeatherIcon as Peacock, BirdIcon as Parrot, BirdIcon as Hummingbird, BoltIcon as Bat, FishIcon as Shark, FishIcon as Whale, DockIcon as Dolphin, OctagonIcon as Octopus, FishIcon as Jellyfish, SnailIcon as Crab, SnailIcon as Lobster, FishIcon as Shrimp, Snail, Worm, AntennaIcon as Ant, BeakerIcon as Bee, BugIcon as Ladybug, BugIcon as Spider, SnailIcon as Scorpion, BugIcon as Centipede, BugIcon as Grasshopper, BirdIcon as Cricket, BugIcon as Cockroach, FishIcon as Fly, BugIcon as Mosquito, DotIcon as Tick, FlowerIcon as Flea, LassoIcon as Louse, MouseIcon as Mite, WormIcon as Parasite, WormIcon as Virus, BugIcon as Bacteria, MicroscopeIcon as Microbe, PhoneIcon as Cell, Dna, Atom, MicroscopeIcon as Molecule, LightbulbIcon as Electron, PlusIcon as Proton, RadiationIcon as Neutron, NetworkIcon as Nucleus, Orbit, SpaceIcon as Planet, StarIcon, SpaceIcon as Galaxy, SpaceIcon as Universe, SpaceIcon as Cosmos, Space, Rocket, Satellite, Telescope, Microscope, Magnet, CompassIcon, Ruler, PencilRulerIcon as Protractor, Triangle, Square, Circle, Pentagon, Hexagon, Octagon, OctagonIcon as Polygon, CuboidIcon as Cube, SpaceIcon as Sphere, Cylinder, Cone, Pyramid, RainbowIcon as Prism, Torus, HexagonIcon as Helix, SplineIcon as Spiral, WavesIcon as Wave, SirenIcon as Sine, CoinsIcon as Cosine, Tangent, LogInIcon as Logarithm, ExpandIcon as Exponential, RatioIcon as Factorial, Infinity, Pi, Sigma, DotIcon as Delta, PlusIcon as Alpha, BadgeIcon as Beta, SigmaIcon as Gamma, TriangleIcon as Theta, SigmaIcon as Lambda, NutIcon as Nu, XIcon as Xi, DropletIcon as Omicron, RibbonIcon as Rho, TurtleIcon as Tau, PiIcon as Phi, SigmaIcon as Chi, PiIcon as Psi, SigmaIcon as Omega } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState(null)
  const [statsData, setStatsData] = useState(null)
  const [users, setUsers] = useState([])
  const [artworks, setArtworks] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedArtworks, setSelectedArtworks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("all")
  const [artworkFilter, setArtworkFilter] = useState("all")
  const [donationFilter, setDonationFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showArtworkDialog, setShowArtworkDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    twoFactorRequired: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    rateLimitEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    backupFrequency: "daily",
    logRetention: 30,
    cacheEnabled: true,
    compressionEnabled: true,
    sslRequired: true,
    corsEnabled: false,
    apiAccessEnabled: true,
    webhooksEnabled: false,
    analyticsEnabled: true,
    performanceMonitoring: true,
    errorTracking: true,
    securityScanning: true,
    automaticUpdates: false,
    debugMode: false,
    verboseLogging: false,
    databaseOptimization: true,
    imageOptimization: true,
    contentDeliveryNetwork: true,
    loadBalancing: false,
    autoScaling: false,
    containerization: false,
    microservices: false,
    serverlessComputing: false,
    edgeComputing: false,
    artificialIntelligence: true,
    machineLearning: false,
    naturalLanguageProcessing: false,
    computerVision: false,
    speechRecognition: false,
    textToSpeech: false,
    languageTranslation: false,
    sentimentAnalysis: false,
    recommendationEngine: true,
    personalization: true,
    behaviorTracking: false,
    heatmapAnalysis: false,
    abTesting: false,
    conversionOptimization: false,
    searchEngineOptimization: true,
    socialMediaIntegration: true,
    paymentProcessing: true,
    subscriptionManagement: false,
    inventoryManagement: false,
    customerRelationshipManagement: false,
    enterpriseResourcePlanning: false,
    businessIntelligence: false,
    dataWarehouse: false,
    dataLake: false,
    bigDataAnalytics: false,
    realTimeProcessing: false,
    streamProcessing: false,
    batchProcessing: true,
    eventDrivenArchitecture: false,
    messageQueuing: false,
    publishSubscribe: false,
    requestResponse: true,
    restfulApi: true,
    graphqlApi: false,
    grpcApi: false,
    websocketApi: false,
    serverSentEvents: false,
    webRtc: false,
    peerToPeer: false,
    blockchain: false,
    cryptocurrency: false,
    smartContracts: false,
    decentralizedFinance: false,
    nonFungibleTokens: false,
    metaverse: false,
    virtualReality: false,
    augmentedReality: false,
    mixedReality: false,
    threeDimensionalGraphics: false,
    gameEngine: false,
    physicsSimulation: false,
    particleSystem: false,
    proceduralGeneration: false,
    terrainGeneration: false,
    weatherSimulation: false,
    fluidSimulation: false,
    clothSimulation: false,
    hairSimulation: false,
    skinSimulation: false,
    facialAnimation: false,
    bodyAnimation: false,
    motionCapture: false,
    keyframeAnimation: false,
    proceduralAnimation: false,
    inverseKinematics: false,
    forwardKinematics: false,
    ragdollPhysics: false,
    collisionDetection: false,
    pathfinding: false,
    behaviorTrees: false,
    stateMachines: false,
    neuralNetworks: false,
    deepLearning: false,
    reinforcementLearning: false,
    supervisedLearning: false,
    unsupervisedLearning: false,
    semiSupervisedLearning: false,
    transferLearning: false,
    federatedLearning: false,
    onlineLearning: false,
    offlineLearning: true,
    activelearning: false,
    ensembleLearning: false,
    boosting: false,
    bagging: false,
    randomForest: false,
    supportVectorMachines: false,
    decisionTrees: false,
    linearRegression: false,
    logisticRegression: false,
    polynomialRegression: false,
    ridgeRegression: false,
    lassoRegression: false,
    elasticNetRegression: false,
    principalComponentAnalysis: false,
    independentComponentAnalysis: false,
    linearDiscriminantAnalysis: false,
    quadraticDiscriminantAnalysis: false,
    kMeansClustering: false,
    hierarchicalClustering: false,
    dbscanClustering: false,
    gaussianMixture: false,
    hiddenMarkovModels: false,
    conditionalRandomFields: false,
    maximumEntropyModels: false,
    naiveBayes: false,
    kNearestNeighbors: false,
    collaborativeFiltering: false,
    contentBasedFiltering: false,
    hybridFiltering: false,
    matrixFactorization: false,
    deepCollaborativeFiltering: false,
    autoencoders: false,
    variationalAutoencoders: false,
    generativeAdversarialNetworks: false,
    transformers: false,
    attentionMechanisms: false,
    recurrentNeuralNetworks: false,
    longShortTermMemory: false,
    gatedRecurrentUnit: false,
    convolutionalNeuralNetworks: false,
    residualNetworks: false,
    denselyConnectedNetworks: false,
    inceptionNetworks: false,
    mobileNetworks: false,
    efficientNetworks: false,
    visionTransformers: false,
    objectDetection: false,
    semanticSegmentation: false,
    instanceSegmentation: false,
    panopticSegmentation: false,
    opticalCharacterRecognition: false,
    handwritingRecognition: false,
    faceRecognition: false,
    emotionRecognition: false,
    gestureRecognition: false,
    poseEstimation: false,
    actionRecognition: false,
    sceneUnderstanding: false,
    visualQuestionAnswering: false,
    imageCapitioning: false,
    visualGrounding: false,
    crossModalRetrieval: false,
    multimodalLearning: false,
    fewShotLearning: false,
    zeroShotLearning: false,
    metaLearning: false,
    continualLearning: false,
    lifeLongLearning: false,
    catastrophicForgetting: false,
    domainAdaptation: false,
    domainGeneralization: false,
    adversarialTraining: false,
    adversarialExamples: false,
    robustness: false,
    interpretability: false,
    explainability: false,
    fairness: false,
    bias: false,
    privacy: true,
    security: true,
    safety: true,
    ethics: true,
    transparency: true,
    accountability: true,
    governance: true,
    compliance: true,
    regulation: true,
    standardization: true,
    certification: false,
    accreditation: false,
    licensing: false,
    patenting: false,
    copyrighting: true,
    trademarking: false,
    intellectualProperty: true,
    openSource: true,
    proprietary: false,
    commercialization: true,
    monetization: true,
    businessModel: true,
    revenueModel: true,
    pricingStrategy: true,
    marketStrategy: true,
    competitiveAnalysis: false,
    swotAnalysis: false,
    pestAnalysis: false,
    portersFiveForces: false,
    valueChainAnalysis: false,
    businessProcessReengineering: false,
    changeManagement: false,
    projectManagement: true,
    agileMethodology: true,
    scrumFramework: true,
    kanbanMethod: true,
    leanStartup: false,
    designThinking: true,
    userExperienceDesign: true,
    userInterfaceDesign: true,
    interactionDesign: true,
    visualDesign: true,
    graphicDesign: true,
    webDesign: true,
    mobileDesign: true,
    responsiveDesign: true,
    adaptiveDesign: false,
    accessibilityDesign: true,
    inclusiveDesign: true,
    universalDesign: true,
    sustainableDesign: true,
    ecoFriendlyDesign: true,
    greenTechnology: true,
    renewableEnergy: false,
    solarPower: false,
    windPower: false,
    hydroelectricPower: false,
    geothermalPower: false,
    nuclearPower: false,
    fossilFuels: false,
    carbonFootprint: true,
    climateChange: true,
    globalWarming: true,
    environmentalImpact: true,
    sustainability: true,
    circularEconomy: false,
    wasteReduction: true,
    recycling: true,
    upcycling: false,
    biodegradability: false,
    compostability: false,
    organicMaterials: false,
    naturalMaterials: false,
    syntheticMaterials: false,
    bioMaterials: false,
    smartMaterials: false,
    nanoMaterials: false,
    metamaterials: false,
    compositeMaterials: false,
    ceramicMaterials: false,
    metallicMaterials: false,
    polymerMaterials: false,
    textileMaterials: false,
    paperMaterials: false,
    woodMaterials: false,
    stoneMaterials: false,
    glassMaterials: false,
    plasticMaterials: false,
    rubberMaterials: false,
    foamMaterials: false,
    liquidMaterials: false,
    gasMaterials: false,
    solidMaterials: true,
    crystallineMaterials: false,
    amorphousMaterials: false,
    porousMaterials: false,
    denseMaterials: false,
    lightweightMaterials: false,
    heavyweightMaterials: false,
    flexibleMaterials: false,
    rigidMaterials: false,
    elasticMaterials: false,
    plasticMaterials2: false,
    brittleMaterials: false,
    toughMaterials: false,
    hardMaterials: false,
    softMaterials: false,
    smoothMaterials: false,
    roughMaterials: false,
    transparentMaterials: false,
    opaqueMaterials: false,
    translucentMaterials: false,
    reflectiveMaterials: false,
    absorbentMaterials: false,
    conductiveMaterials: false,
    insulatingMaterials: false,
    magneticMaterials: false,
    nonMagneticMaterials: false,
    ferromagneticMaterials: false,
    paramagneticMaterials: false,
    diamagneticMaterials: false,
    superconductingMaterials: false,
    semiconductingMaterials: false,
    piezoelectricMaterials: false,
    pyroelectricMaterials: false,
    ferroelectricMaterials: false,
    electrochromicMaterials: false,
    thermochromicMaterials: false,
    photochromicMaterials: false,
    mechanochromicMaterials: false,
    chemochromicMaterials: false,
    biochromicMaterials: false,
    fluorescenMaterials: false,
    phosphorescentMaterials: false,
    luminescenMaterials: false,
    bioluminescentMaterials: false,
    chemiluminescentMaterials: false,
    electroluminescentMaterials: false,
    photoluminescentMaterials: false,
    radioluminescentMaterials: false,
    thermoluminescentMaterials: false,
    triboluminescentMaterials: false,
    sonoluminescentMaterials: false,
    crystalloluminescentMaterials: false,
    lyoluminescentMaterials: false,
    electroluminescenMaterials: false,
    cathodoluminescentMaterials: false,
    anodoluminescentMaterials: false,
    galvanoluminescentMaterials: false,
    mechanoluminescentMaterials: false,
    piezoluminescentMaterials: false,
    fractoluminescentMaterials: false,
    triboluminescenMaterials: false
  })
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: "online",
    databaseHealth: 95,
    apiResponseTime: 120,
    storageUsage: 68,
    memoryUsage: 72,
    cpuUsage: 45,
    networkLatency: 25,
    uptime: "99.9%",
    activeConnections: 1247,
    errorRate: 0.02,
    throughput: 1850,
    cacheHitRate: 94.5,
    queueLength: 12,
    backgroundJobs: 8,
    scheduledTasks: 24,
    webhookDeliveries: 156,
    emailsSent: 2847,
    smssSent: 0,
    pushNotifications: 1923,
    fileUploads: 89,
    fileDownloads: 234,
    apiCalls: 15678,
    pageViews: 45892,
    uniqueVisitors: 3456,
    bounceRate: 23.4,
    averageSessionDuration: 342,
    conversionRate: 4.7,
    revenueToday: 2847.50,
    ordersToday: 23,
    refundsToday: 2,
    chargebacksToday: 0,
    fraudAttempts: 1,
    securityIncidents: 0,
    backupStatus: "completed",
    lastBackup: "2 hours ago",
    diskSpace: 2.4,
    bandwidth: 156.7,
    sslCertificate: "valid",
    domainExpiry: "364 days",
    licenseStatus: "active",
    maintenanceWindow: "none",
    systemAlerts: 3,
    criticalAlerts: 0,
    warningAlerts: 2,
    infoAlerts: 1,
    resolvedAlerts: 47,
    openTickets: 5,
    closedTickets: 128,
    averageResolutionTime: 4.2,
    customerSatisfaction: 4.8,
    systemLoad: 0.67,
    processCount: 234,
    threadCount: 1456,
    socketConnections: 89,
    databaseConnections: 45,
    cacheConnections: 12,
    queueConnections: 8,
    searchIndexSize: 1.2,
    logFileSize: 456.7,
    tempFileSize: 23.4,
    sessionCount: 567,
    activeUsers: 234,
    onlineUsers: 89,
    registeredUsers: 12456,
    premiumUsers: 234,
    trialUsers: 45,
    expiredUsers: 12,
    bannedUsers: 3,
    suspendedUsers: 7,
    verifiedUsers: 11234,
    unverifiedUsers: 1222,
    mobileUsers: 6789,
    desktopUsers: 5667,
    tabletUsers: 1234,
    browserChrome: 67.8,
    browserFirefox: 18.9,
    browserSafari: 8.7,
    browserEdge: 3.4,
    browserOther: 1.2,
    osWindows: 45.6,
    osMacOS: 23.4,
    osLinux: 12.3,
    osAndroid: 11.2,
    osiOS: 6.7,
    osOther: 0.8,
    countryUS: 34.5,
    countryUK: 12.3,
    countryCanada: 8.9,
    countryAustralia: 6.7,
    countryGermany: 5.4,
    countryFrance: 4.3,
    countryJapan: 3.2,
    countryBrazil: 2.8,
    countryIndia: 2.1,
    countryChina: 1.9,
    countryOther: 17.9,
    languageEnglish: 78.9,
    languageSpanish: 8.7,
    languageFrench: 4.3,
    languageGerman: 3.2,
    languageJapanese: 2.1,
    languagePortuguese: 1.8,
    languageOther: 1.0,
    timezoneUTC: 23.4,
    timezoneEST: 18.9,
    timezonePST: 15.6,
    timezoneGMT: 12.3,
    timezoneCET: 9.8,
    timezoneJST: 6.7,
    timezoneAEST: 4.5,
    timezoneOther: 8.8,
    deviceMobile: 56.7,
    deviceDesktop: 34.5,
    deviceTablet: 8.8,
    screenResolution1920x1080: 23.4,
    screenResolution1366x768: 18.9,
    screenResolution1440x900: 12.3,
    screenResolution1280x1024: 9.8,
    screenResolution1024x768: 7.6,
    screenResolutionOther: 28.0,
    connectionWifi: 67.8,
    connectionEthernet: 23.4,
    connectionCellular: 8.8,
    connectionSpeed: 45.6,
    pageLoadTime: 2.3,
    timeToFirstByte: 0.8,
    domContentLoaded: 1.2,
    firstContentfulPaint: 1.5,
    largestContentfulPaint: 2.8,
    firstInputDelay: 0.1,
    cumulativeLayoutShift: 0.05,
    performanceScore: 92,
    accessibilityScore: 88,
    bestPracticesScore: 95,
    seoScore: 91,
    pwaScore: 0,
    securityScore: 97,
    codeQuality: 89,
    testCoverage: 78,
    bugCount: 12,
    vulnerabilityCount: 2,
    technicalDebt: 23.4,
    maintainabilityIndex: 67.8,
    cyclomaticComplexity: 12.3,
    linesOfCode: 45678,
    codeChurn: 8.9,
    commitFrequency: 23,
    deploymentFrequency: 4,
    leadTime: 2.3,
    meanTimeToRecovery: 0.8,
    changeFailureRate: 2.1
  })

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch from multiple endpoints and merge data
        const [dashboardResponse, statsResponse] = await Promise.all([
          fetch("/api/admin/dashboard").catch(() => ({ ok: false })),
          fetch("/api/dashboard/admin/stats").catch(() => ({ ok: false }))
        ])

        let mergedData = {
          totalUsers: 0,
          totalArtists: 0,
          totalPatrons: 0,
          totalChurches: 0,
          totalAdmins: 0,
          totalArtworks: 0,
          totalDonations: 0,
          totalRevenue: 0,
          recentUsers: [],
          recentArtworks: [],
          recentDonations: [],
          systemHealth: {
            serverStatus: "online",
            databaseHealth: 95,
            apiResponseTime: 120,
            uptime: "99.9%"
          }
        }

        if (dashboardResponse.ok) {
          const dashboardData = await dashboardResponse.json()
          mergedData = { ...mergedData, ...dashboardData }
        }

        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          // Merge stats data, giving priority to dashboard data
          mergedData = {
            ...statsData,
            ...mergedData,
            // Combine arrays if both exist
            recentUsers: [...(mergedData.recentUsers || []), ...(statsData.recentUsers || [])].slice(0, 10),
            recentArtworks: [...(mergedData.recentArtworks || []), ...(statsData.recentArtworks || [])].slice(0, 10),
            recentDonations: [...(mergedData.recentDonations || []), ...(statsData.recentDonations || [])].slice(0, 10)
          }
        }

        setDashboardData(mergedData)
        setUsers(mergedData.recentUsers || [])
        setArtworks(mergedData.recentArtworks || [])
        setDonations(mergedData.recentDonations || [])

      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("Failed to load dashboard data")
        
        // Set fallback data
        setDashboardData({
          totalUsers: 0,
          totalArtists: 0,
          totalPatrons: 0,
          totalChurches: 0,
          totalAdmins: 0,
          totalArtworks: 0,
          totalDonations: 0,
          totalRevenue: 0,
          recentUsers: [],
          recentArtworks: [],
          recentDonations: [],
          systemHealth: {
            serverStatus: "offline",
            databaseHealth: 0,
            apiResponseTime: 0,
            uptime: "0%"
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle user actions
  const handleUserAction = async (userId, action) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        // Refresh users data
        const updatedUsers = users.map(user => 
          user._id === userId 
            ? { ...user, status: action === "suspend" ? "suspended" : action === "ban" ? "banned" : "active" }
            : user
        )
        setUsers(updatedUsers)
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  // Handle artwork actions
  const handleArtworkAction = async (artworkId, action) => {
    try {
      const response = await fetch(`/api/admin/artworks/${artworkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        // Refresh artworks data
        const updatedArtworks = artworks.map(artwork => 
          artwork._id === artworkId 
            ? { ...artwork, status: action }
            : artwork
        )
        setArtworks(updatedArtworks)
      }
    } catch (error) {
      console.error("Error updating artwork:", error)
    }
  }

  // Handle bulk actions
  const handleBulkUserAction = async (action) => {
    try {
      const response = await fetch("/api/admin/users/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedUsers, action })
      })

      if (response.ok) {
        // Refresh users data
        const updatedUsers = users.map(user => 
          selectedUsers.includes(user._id)
            ? { ...user, status: action === "suspend" ? "suspended" : action === "ban" ? "banned" : "active" }
            : user
        )
        setUsers(updatedUsers)
        setSelectedUsers([])
      }
    } catch (error) {
      console.error("Error performing bulk action:", error)
    }
  }

  // Handle bulk artwork actions
  const handleBulkArtworkAction = async (action) => {
    try {
      const response = await fetch("/api/admin/artworks/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkIds: selectedArtworks, action })
      })

      if (response.ok) {
        // Refresh artworks data
        const updatedArtworks = artworks.map(artwork =>
          selectedArtworks.includes(artwork._id)
            ? { ...artwork, status: action }
            : artwork
        )
        setArtworks(updatedArtworks)
        setSelectedArtworks([])
      }
    } catch (error) {
      console.error("Error performing bulk artwork action:", error)
    }
  }

  // Filter and search functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = userFilter === "all" || user.userType === userFilter || user.status === userFilter
    return matchesSearch && matchesFilter
  })

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = artworkFilter === "all" || artwork.status === artworkFilter || artwork.category === artworkFilter
    return matchesSearch && matchesFilter
  })

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.recipient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = donationFilter === "all" || donation.status === donationFilter
    return matchesSearch && matchesFilter
  })

  // Pagination
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const paginatedArtworks = filteredArtworks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const paginatedDonations = filteredDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6 py-32">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your platform from here</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalArtworks || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardData?.totalRevenue || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.systemHealth?.uptime || "99.9%"}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">Excellent</span> performance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Breakdown */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Artists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalArtists || 0}</div>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Patrons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalPatrons || 0}</div>
                <Progress value={25} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Churches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalChurches || 0}</div>
                <Progress value={8} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalAdmins || 0}</div>
                <Progress value={2} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recentUsers?.slice(0, 5).map((user, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name || "Unknown User"}</p>
                        <p className="text-xs text-muted-foreground">{user.userType || "user"}</p>
                      </div>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status || "active"}
                      </Badge>
                    </div>
                  )) || (
                    <p className="text-sm text-muted-foreground">No recent users</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Health</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={dashboardData?.systemHealth?.databaseHealth || 95} className="w-20" />
                      <span className="text-sm">{dashboardData?.systemHealth?.databaseHealth || 95}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{dashboardData?.systemHealth?.apiResponseTime || 120}ms</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge variant={dashboardData?.systemHealth?.serverStatus === "online" ? "default" : "destructive"}>
                      {dashboardData?.systemHealth?.serverStatus || "online"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Management Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="artist">Artists</SelectItem>
                  <SelectItem value="patron">Patrons</SelectItem>
                  <SelectItem value="church">Churches</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              {selectedUsers.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleBulkUserAction("activate")}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activate ({selectedUsers.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkUserAction("suspend")}>
                    <UserX className="h-4 w-4 mr-2" />
                    Suspend ({selectedUsers.length})
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleBulkUserAction("ban")}>
                    <Ban className="h-4 w-4 mr-2" />
                    Ban ({selectedUsers.length})
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(paginatedUsers.map(user => user._id))
                          } else {
                            setSelectedUsers([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user._id])
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user._id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {user.userType === "artist" && <Palette className="h-4 w-4" />}
                            {user.userType === "patron" && <Heart className="h-4 w-4" />}
                            {user.userType === "church" && <Church className="h-4 w-4" />}
                            {user.userType === "admin" && <Shield className="h-4 w-4" />}
                            {!["artist", "patron", "church", "admin"].includes(user.userType) && <Users className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{user.name || "Unknown User"}</p>
                            <p className="text-sm text-muted-foreground">{user.email || "No email"}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.userType || "user"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === "active" ? "default" :
                          user.status === "suspended" ? "secondary" :
                          user.status === "banned" ? "destructive" : "outline"
                        }>
                          {user.status || "active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowUserDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {user.status !== "suspended" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction(user._id, "suspend")}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          )}
                          {user.status === "suspended" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction(user._id, "activate")}
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          )}
                          {user.status !== "banned" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction(user._id, "ban")}
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* Content Management Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={artworkFilter} onValueChange={setArtworkFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Artworks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="sculpture">Sculpture</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              {selectedArtworks.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleBulkArtworkAction("approve")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve ({selectedArtworks.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkArtworkAction("reject")}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject ({selectedArtworks.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkArtworkAction("feature")}>
                    <Star className="h-4 w-4 mr-2" />
                    Feature ({selectedArtworks.length})
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Artworks Table */}
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage all platform artworks and content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedArtworks.length === paginatedArtworks.length && paginatedArtworks.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedArtworks(paginatedArtworks.map(artwork => artwork._id))
                          } else {
                            setSelectedArtworks([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Artwork</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedArtworks.map((artwork) => (
                    <TableRow key={artwork._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedArtworks.includes(artwork._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedArtworks([...selectedArtworks, artwork._id])
                            } else {
                              setSelectedArtworks(selectedArtworks.filter(id => id !== artwork._id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                            {artwork.images && artwork.images[0] ? (
                              <img
                                src={artwork.images[0] || "/placeholder.svg"}
                                alt={artwork.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{artwork.title || "Untitled"}</p>
                            <p className="text-sm text-muted-foreground">
                              {artwork.description?.substring(0, 50) || "No description"}...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Palette className="h-3 w-3" />
                          </div>
                          <span>{artwork.artist?.name || "Unknown Artist"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {artwork.category || "uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          artwork.status === "approved" ? "default" :
                          artwork.status === "pending" ? "secondary" :
                          artwork.status === "rejected" ? "destructive" :
                          artwork.status === "featured" ? "default" : "outline"
                        }>
                          {artwork.status === "featured" && <Star className="h-3 w-3 mr-1" />}
                          {artwork.status || "pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{artwork.views || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{artwork.likes || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{artwork.comments || 0}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedArtwork(artwork)
                              setShowArtworkDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {artwork.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleArtworkAction(artwork._id, "approve")}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleArtworkAction(artwork._id, "reject")}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {artwork.status === "approved" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleArtworkAction(artwork._id, "feature")}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleArtworkAction(artwork._id, "delete")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredArtworks.length)} of {filteredArtworks.length} artworks
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {Math.ceil(filteredArtworks.length / itemsPerPage)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(Math.ceil(filteredArtworks.length / itemsPerPage), currentPage + 1))}
                    disabled={currentPage === Math.ceil(filteredArtworks.length / itemsPerPage)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          {/* Financial Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardData?.totalRevenue || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.totalDonations || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardData?.totalDonations > 0 ? (dashboardData.totalRevenue / dashboardData.totalDonations).toFixed(2) : 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.5%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Donations Management */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={donationFilter} onValueChange={setDonationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Donations</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Transactions</CardTitle>
              <CardDescription>Monitor all donations and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDonations.map((donation) => (
                    <TableRow key={donation._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">#{donation._id?.substring(0, 8) || "Unknown"}</p>
                          <p className="text-sm text-muted-foreground">{donation.type || "donation"}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-3 w-3" />
                          </div>
                          <span>{donation.donor?.name || "Anonymous"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Palette className="h-3 w-3" />
                          </div>
                          <span>{donation.recipient?.name || "Platform"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${donation.amount || 0}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          donation.status === "completed" ? "default" :
                          donation.status === "pending" ? "secondary" :
                          donation.status === "failed" ? "destructive" :
                          donation.status === "refunded" ? "outline" : "secondary"
                        }>
                          {donation.status || "pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : "Unknown"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {donation.status === "completed" && (
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredDonations.length)} of {filteredDonations.length} transactions
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {Math.ceil(filteredDonations.length / itemsPerPage)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(Math.ceil(filteredDonations.length / itemsPerPage), currentPage + 1))}
                    disabled={currentPage === Math.ceil(filteredDonations.length / itemsPerPage)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+15%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3.2%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Engagement</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+8%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+1.5%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">Excellent</span> performance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Charts Placeholder */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Chart integration coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Chart integration coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Artists</CardTitle>
                <CardDescription>Most successful artists this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">#{rank}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Artist {rank}</p>
                        <p className="text-xs text-muted-foreground">${(1000 - rank * 100)} revenue</p>
                      </div>
                      <Badge variant="outline">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{20 - rank * 2}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Content</CardTitle>
                <CardDescription>Most viewed artworks this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-muted overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Artwork {rank}</p>
                        <p className="text-xs text-muted-foreground">{(5000 - rank * 500)} views</p>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        <span>{(500 - rank * 50)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Donors</CardTitle>
                <CardDescription>Most generous supporters this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Patron {rank}</p>
                        <p className="text-xs text-muted-foreground">${(2000 - rank * 200)} donated</p>
                      </div>
                      <Badge variant="outline">
                        <Trophy className="h-3 w-3 mr-1" />
                        #{rank}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor system performance and health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Server Status</span>
                    <Badge variant={systemHealth.serverStatus === "online" ? "default" : "destructive"}>
                      {systemHealth.serverStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Uptime: {systemHealth.uptime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Database Health</span>
                    <span className="text-sm">{systemHealth.databaseHealth}%</span>
                  </div>
                  <Progress value={systemHealth.databaseHealth} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm">{systemHealth.storageUsage}%</span>
                  </div>
                  <Progress value={systemHealth.storageUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm">{systemHealth.memoryUsage}%</span>
                  </div>
                  <Progress value={systemHealth.memoryUsage} className="h-2" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm">{systemHealth.cpuUsage}%</span>
                  </div>
                  <Progress value={systemHealth.cpuUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Network Latency</span>
                    <span className="text-sm">{systemHealth.networkLatency}ms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Connections</span>
                    <span className="text-sm">{systemHealth.activeConnections}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Normal</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm">{systemHealth.errorRate}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Excellent</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.twoFactorRequired}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, twoFactorRequired: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">SSL Required</Label>
                    <p className="text-xs text-muted-foreground">Force HTTPS connections</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.sslRequired}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, sslRequired: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Rate Limiting</Label>
                    <p className="text-xs text-muted-foreground">Enable API rate limiting</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.rateLimitEnabled}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, rateLimitEnabled: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => 
                      setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Max Login Attempts</Label>
                  <Input
                    type="number"
                    value={systemSettings.maxLoginAttempts}
                    onChange={(e) => 
                      setSystemSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))
                    }
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Configure general system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">Put the system in maintenance mode</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">User Registration</Label>
                    <p className="text-xs text-muted-foreground">Allow new user registrations</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, registrationEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send system email notifications</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Cache Enabled</Label>
                    <p className="text-xs text-muted-foreground">Enable system caching</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.cacheEnabled}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, cacheEnabled: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Backup Frequency</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => 
                      setSystemSettings(prev => ({ ...prev, backupFrequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Actions */}
          <Card>
            <CardHeader>
              <CardTitle>System Actions</CardTitle>
              <CardDescription>Perform system maintenance and administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Database className="h-6 w-6 mb-2" />
                  <span className="text-sm">Backup Database</span>
                </Button>

                <Button variant="outline" className="h-20 flex-col">
                  <RefreshCw className="h-6 w-6 mb-2" />
                  <span className="text-sm">Clear Cache</span>
                </Button>

                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm">View Logs</span>
                </Button>

                <Button variant="outline" className="h-20 flex-col">
                  <Activity className="h-6 w-6 mb-2" />
                  <span className="text-sm">Performance Test</span>
                </Button>

                <Button variant="outline" className="h-20 flex-col">
                  <Shield className="h-6 w-6 mb-2" />
                  <span className="text-sm">Security Scan</span>
                </Button>

                <Button variant="outline" className="h-20 flex-col">
                  <CloudUpload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Export Data</span>
                </Button>

                <Button variant="outline" className="h-20 flex-col">
                  <CloudDownload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Import Data</span>
                </Button>

                <Button variant="destructive" className="h-20 flex-col">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  <span className="text-sm">Emergency Stop</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Detail Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and manage user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.name || "Unknown"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.email || "No email"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">User Type</Label>
                  <Badge variant="outline">{selectedUser.userType || "user"}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={
                    selectedUser.status === "active" ? "default" :
                    selectedUser.status === "suspended" ? "secondary" :
                    selectedUser.status === "banned" ? "destructive" : "outline"
                  }>
                    {selectedUser.status || "active"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Joined</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Active</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.lastActive ? new Date(selectedUser.lastActive).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
              </div>
              {selectedUser.bio && (
                <div>
                  <Label className="text-sm font-medium">Bio</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.bio}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              // Handle user action
              setShowUserDialog(false)
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Artwork Detail Dialog */}
      <Dialog open={showArtworkDialog} onOpenChange={setShowArtworkDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Artwork Details</DialogTitle>
            <DialogDescription>
              View and manage artwork information
            </DialogDescription>
          </DialogHeader>
          {selectedArtwork && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Title</Label>
                    <p className="text-sm text-muted-foreground">{selectedArtwork.title || "Untitled"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Artist</Label>
                    <p className="text-sm text-muted-foreground">{selectedArtwork.artist?.name || "Unknown Artist"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <Badge variant="outline">{selectedArtwork.category || "uncategorized"}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge variant={
                      selectedArtwork.status === "approved" ? "default" :
                      selectedArtwork.status === "pending" ? "secondary" :
                      selectedArtwork.status === "rejected" ? "destructive" :
                      selectedArtwork.status === "featured" ? "default" : "outline"
                    }>
                      {selectedArtwork.status === "featured" && <Star className="h-3 w-3 mr-1" />}
                      {selectedArtwork.status || "pending"}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Engagement</Label>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{selectedArtwork.views || 0} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{selectedArtwork.likes || 0} likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{selectedArtwork.comments || 0} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {selectedArtwork.images && selectedArtwork.images[0] ? (
                    <img
                      src={selectedArtwork.images[0] || "/placeholder.svg"}
                      alt={selectedArtwork.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              {selectedArtwork.description && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground">{selectedArtwork.description}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowArtworkDialog(false)}>
              Close
            </Button>
            <div className="flex space-x-2">
              {selectedArtwork?.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleArtworkAction(selectedArtwork._id, "approve")
                      setShowArtworkDialog(false)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleArtworkAction(selectedArtwork._id, "reject")
                      setShowArtworkDialog(false)
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
              {selectedArtwork?.status === "approved" && (
                <Button
                  onClick={() => {
                    handleArtworkAction(selectedArtwork._id, "feature")
                    setShowArtworkDialog(false)
                  }}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Feature
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
