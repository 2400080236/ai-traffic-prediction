import { Link } from 'react-router-dom';
import { ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';

const Dashboard = () => {
  return (
    <div className="w-full relative overflow-hidden bg-[#0B0D10]">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#F5B942]/10 rounded-full blur-[120px]" 
        />
      </div>

      <PageContainer className="relative z-10 pt-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="w-full lg:w-[55%] space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2A2F36] bg-[#12161B] text-[#F5B942] text-xs font-semibold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] animate-pulse" />
                Intelligent Mobility Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                Predict Traffic.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B942] to-[#F59E0B]">Plan Smarter.</span>
              </h1>
              <p className="mt-6 text-xl text-gray-400 max-w-2xl leading-relaxed">
                AI-powered hourly traffic volume prediction using historical traffic, weather, time and holiday patterns.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-4 pt-4">
              <Link to="/predict" className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5B942] hover:bg-[#E5A932] text-black font-semibold rounded-lg transition-all text-lg shadow-[0_0_20px_rgba(245,185,66,0.3)]">
                Predict Traffic <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/model" className="inline-flex items-center gap-2 px-8 py-4 bg-[#12161B] hover:bg-[#1A1F26] border border-[#2A2F36] text-white font-semibold rounded-lg transition-all text-lg">
                Explore Model
              </Link>
            </motion.div>
          </div>

          <div className="w-full lg:w-[45%] relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative bg-[#12161B] border border-[#2A2F36] rounded-2xl p-6 h-[400px] overflow-hidden flex flex-col">
              {/* Abstract decorative visualization */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <svg viewBox="0 0 400 300" className="w-full h-full stroke-[#F5B942]/20 fill-none" strokeWidth="2">
                  <path d="M-50,150 Q100,250 200,150 T450,150" strokeWidth="4" />
                  <path d="M-50,100 Q150,0 250,100 T450,200" strokeDasharray="4 4" />
                  <path d="M50,350 Q150,150 350,-50" strokeWidth="2" strokeDasharray="10 10" />
                </svg>
                {/* Moving dots */}
                <motion.div animate={{ left: ['0%', '100%'], top: ['50%', '30%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute w-2 h-2 rounded-full bg-[#F5B942] shadow-[0_0_10px_#F5B942]" />
                <motion.div animate={{ left: ['0%', '100%'], top: ['60%', '50%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]" />
                <motion.div animate={{ left: ['100%', '0%'], top: ['20%', '80%'] }} transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }} className="absolute w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_10px_#EF4444]" />
              </div>

              {/* Status Module overlaying the visualization */}
              <div className="relative z-10 bg-[#0B0D10]/80 backdrop-blur-sm border border-[#2A2F36] p-5 rounded-xl w-64 mt-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-gray-400 tracking-wider">SYSTEM STATUS</span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-sm font-semibold text-white">OPERATIONAL</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#2A2F36] pb-2">
                    <span className="text-xs text-gray-500">API</span>
                    <span className="text-xs font-medium text-[#10B981]">Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">MODEL</span>
                    <span className="text-xs font-medium text-white">XGBoost v1.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* METRICS SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-bold tracking-widest text-gray-300 uppercase">Model Performance</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#2A2F36] to-transparent"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/3 bg-gradient-to-br from-[#12161B] to-[#0B0D10] border border-[#2A2F36] p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-24 h-24 text-[#F5B942]" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-500 tracking-wider mb-2">MODEL</div>
                  <h3 className="text-4xl font-bold text-white mb-2">XGBoost</h3>
                  <p className="text-sm text-[#F5B942]">Selected production model</p>
                </div>
                <div className="mt-8">
                  <Link to="/model" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-5">
              <MetricBox label="RMSE" value="509.51" delay={0.1} />
              <MetricBox label="MAE" value="296.30" delay={0.2} />
              <MetricBox label="R²" value="0.9329" delay={0.3} />
              <MetricBox label="DATA" value="48,204" delay={0.4} />
            </div>
          </div>
        </section>

        {/* TRAFFIC INTELLIGENCE SECTION */}
        <section className="mb-16 bg-[#12161B] border border-[#2A2F36] rounded-[20px] p-7">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-wide mb-2">TRAFFIC INTELLIGENCE</h2>
            <p className="text-gray-400 text-lg">Model performance and prediction workflow visualization</p>
          </div>
          
          <div className="h-[280px] w-full rounded-xl bg-[#0B0D10] border border-[#2A2F36] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-end justify-around px-8 pb-8 pt-16">
               {/* Decorative bar chart for visual explanatory graphic */}
               {[40, 65, 45, 80, 55, 90, 70, 85, 60, 40].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-[6%] bg-gradient-to-t from-[#F5B942]/20 to-[#F5B942]/80 rounded-t-sm"
                  />
               ))}
            </div>
            <div className="absolute top-6 left-8 bg-[#12161B] border border-[#2A2F36] px-4 py-2 rounded-lg text-sm text-gray-300">
               Volume Distribution Analysis
            </div>
          </div>
        </section>

        {/* PREDICTION CTA */}
        <section className="mb-[72px] relative rounded-2xl overflow-hidden border border-[#2A2F36] group bg-gradient-to-r from-[#12161B] to-[#12161B]/80 flex flex-col md:flex-row items-center justify-between p-8 md:px-9 md:py-8 min-h-[150px] gap-6">
          <div className="absolute inset-0 opacity-30 z-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDIwaDQwIiBzdHJva2U9IiNGNUI5NDIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNCA0Ii8+PC9zdmc+')] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">READY TO FORECAST?</h2>
            <p className="text-gray-400">
              Enter weather and time conditions to estimate hourly traffic volume instantly.
            </p>
          </div>
          <Link to="/predict" className="relative z-10 shrink-0 flex items-center gap-2 px-8 py-4 bg-[#F5B942] hover:bg-[#E5A932] text-black font-bold rounded-xl transition-transform hover:scale-105 text-lg">
            Predict Traffic <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        {/* MLOPS TIMELINE SECTION */}
        <section className="pt-2 pb-10">
          <div className="flex items-center gap-4 mb-7">
            <h2 className="text-xl font-bold tracking-widest text-gray-300 uppercase">MLOps Pipeline</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#2A2F36] to-transparent"></div>
          </div>

          <div className="relative px-6">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-6 left-[8%] right-[8%] h-0.5 bg-[#2A2F36] z-0">
               <motion.div 
                 initial={{ width: 0 }} 
                 whileInView={{ width: '100%' }} 
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
                 className="h-full bg-[#F5B942]" 
               />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 relative z-10">
              <TimelineStep num="01" title="DATA" desc="Extraction" delay={0.1} />
              <TimelineStep num="02" title="FEATURES" desc="Engineering" delay={0.2} />
              <TimelineStep num="03" title="TRAIN" desc="Optimization" delay={0.3} />
              <TimelineStep num="04" title="MLFLOW" desc="Tracking" delay={0.4} />
              <TimelineStep num="05" title="XGBOOST" desc="Artifact" delay={0.5} active={true} />
              <TimelineStep num="06" title="FASTAPI" desc="Serving" delay={0.6} />
              <TimelineStep num="07" title="PREDICTION" desc="Inference" delay={0.7} />
            </div>
          </div>
        </section>
        
      </PageContainer>
    </div>
  );
};

const MetricBox = ({ label, value, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.5, delay }}
    className="bg-[#12161B] border border-[#2A2F36] p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:border-[#F5B942]/30 transition-colors"
  >
    <div className="text-xs font-bold text-gray-500 tracking-wider mb-3">{label}</div>
    <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">{value}</div>
  </motion.div>
);

const TimelineStep = ({ num, title, desc, delay, active = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.4, delay }}
    className="flex lg:flex-col items-center lg:items-center gap-4 lg:gap-6 lg:w-32 group"
  >
    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-[#0B0D10] text-sm font-bold z-10 transition-colors ${active ? 'border-[#F5B942] text-[#F5B942]' : 'border-[#2A2F36] text-gray-400 group-hover:border-gray-500'}`}>
      {num}
    </div>
    <div className="text-left lg:text-center">
      <h4 className={`font-bold text-sm tracking-wide ${active ? 'text-[#F5B942]' : 'text-gray-200'}`}>{title}</h4>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  </motion.div>
);

export default Dashboard;
