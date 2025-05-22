import { 
  User, 
  Wallet, 
  Target, 
  TrendingUp, 
  BarChart2, 
  Globe, 
  Lock,
  DollarSign,
  CreditCard,
  PieChart,
  CheckCircle,
  Calendar,
  AlertCircle,
  LineChart,
  MessageSquare
} from 'lucide-react';

export default function FeaturesComponent() {
  // Array of features with icons, titles, and descriptions
  const features = [
    {
      icon: <User className="h-8 w-8 text-blue-500" />,
      title: "User Account Management",
      description: "Sign up, log in, and secure access using sessions. Each user has their own private financial data.",
      details: [
        "Secure authentication system",
        "Personal financial profiles",
        "Data privacy protection"
      ]
    },
    {
      icon: <Wallet className="h-8 w-8 text-cyan-500" />,
      title: "Income & Expense Tracking",
      description: "Add, edit, and delete monthly and annual income and expenses. Supports different categories (e.g., salary, groceries, rent, subscriptions).",
      details: [
        "Multiple income sources",
        "Customizable expense categories",
        "Recurring transactions"
      ]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Financial Goals Evaluation",
      description: "Users can enter future goals (e.g., buying a car, vacation, investment). The system calculates whether the goal is financially achievable based on current income and expenses.",
      details: [
        "Goal progress tracking",
        "Achievement timeline estimation",
        "Adjustable parameters"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-teal-500" />,
      title: "Smart Financial Advice",
      description: "The app analyzes user data and gives custom recommendations to reduce spending in specific categories, increase savings rate, and postpone or split large goals into smaller steps.",
      details: [
        "Personalized spending insights",
        "Savings optimization tips",
        "Goal achievement strategies"
      ]
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-blue-400" />,
      title: "Interactive Dashboard",
      description: "Clean and responsive UI built with React and Bootstrap. Summary cards showing total income, expenses, and remaining budget. Modal windows for editing entries without leaving the main screen.",
      details: [
        "Visual data representation",
        "Real-time updates",
        "Customizable views"
      ]
    },
    {
      icon: <Globe className="h-8 w-8 text-cyan-400" />,
      title: "Multi-Language Support",
      description: "Supports both English and Hebrew (with possible future Arabic support).",
      details: [
        "Full UI translation",
        "Currency format adaptation",
        "Regional settings"
      ]
    }
  ];

  return (
    <div className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Features Header */}
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-cyan-400 tracking-wide uppercase">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Take Control of Your Finances
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
            Our financial management app includes these useful and user-friendly features 
            designed to help you achieve your financial goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-700"
            >
              {/* Feature Header */}
              <div className="p-6 bg-slate-800/60 flex items-center">
                <div className="bg-slate-900 rounded-full p-3 shadow">
                  {feature.icon}
                </div>
                <h3 className="ml-4 text-xl font-bold text-white flex items-center">
                  {feature.title}
                  <CheckCircle className="ml-2 h-5 w-5 text-teal-500" />
                </h3>
              </div>
              
              {/* Feature Content */}
              <div className="p-6">
                <p className="text-slate-300 mb-6">
                  {feature.description}
                </p>
                
                <div className="space-y-3">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-cyan-500" />
                      </div>
                      <p className="ml-3 text-sm text-slate-400">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-16 bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-white mb-4">Complete Financial Management Solution</h3>
              <p className="text-slate-300 mb-6">
                Our platform brings together all the essential tools you need to manage your finances effectively 
                in one intuitive application.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Budget Planning</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Expense Categorization</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Monthly Reports</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Secure Data</span>
                </div>
                <div className="flex items-center">
                  <PieChart className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Visual Analytics</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Smart Alerts</span>
                </div>
                <div className="flex items-center">
                  <LineChart className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Trend Analysis</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-sm text-slate-300">Financial Advice</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-800 to-cyan-800 p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Financial App?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-white font-medium">All-in-one solution</p>
                    <p className="text-blue-100 text-sm">Everything you need in a single app</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-white font-medium">User-friendly interface</p>
                    <p className="text-blue-100 text-sm">Intuitive design for all experience levels</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-white font-medium">Actionable insights</p>
                    <p className="text-blue-100 text-sm">Data-driven recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-white font-medium">Secure and private</p>
                    <p className="text-blue-100 text-sm">Your financial data stays protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}