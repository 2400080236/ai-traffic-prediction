import { Settings, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';

const About = () => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#0B0D10] relative pb-20">
      <PageContainer className="py-16 relative z-10">
        <div className="max-w-[1100px] mx-auto w-full space-y-16">
          
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">About TrafficAI</h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                An intelligent transportation command center designed to anticipate urban mobility patterns using advanced machine learning.
              </p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#12161B] border border-[#2A2F36] rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6">What problem does it solve?</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Urban traffic congestion leads to lost productivity, increased carbon emissions, and decreased quality of life. Traditional traffic planning relies on static assumptions. TrafficAI solves this by providing highly accurate, dynamic forecasts of hourly traffic volume based on complex, interacting variables like weather systems, temporal cycles, and holiday events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#0B0D10] border border-[#2A2F36] rounded-2xl">
                <div className="text-[#F5B942] font-bold tracking-widest text-sm mb-2 uppercase">Proactive Planning</div>
                <p className="text-gray-400">Enables city planners and transportation authorities to anticipate volume spikes before they occur.</p>
              </div>
              <div className="p-6 bg-[#0B0D10] border border-[#2A2F36] rounded-2xl">
                <div className="text-[#F5B942] font-bold tracking-widest text-sm mb-2 uppercase">Dynamic Resource Allocation</div>
                <p className="text-gray-400">Allows for intelligent routing of emergency services and optimization of public transit schedules.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#12161B] border border-[#2A2F36] rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6">How does the system work?</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#0B0D10] border border-[#2A2F36] flex items-center justify-center text-[#F5B942] font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Historical Data Ingestion</h3>
                  <p className="text-gray-400 leading-relaxed">The system ingested over 48,000 chronological records containing multidimensional variables including precise weather metrics (temperature, precipitation, cloud cover) and temporal contexts.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#0B0D10] border border-[#2A2F36] flex items-center justify-center text-[#F5B942] font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Feature Engineering</h3>
                  <p className="text-gray-400 leading-relaxed">Temporal features were cyclically encoded to capture the continuous nature of time (e.g., December to January transition). Missing values were strictly imputed using training distributions to prevent data leakage.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#0B0D10] border border-[#2A2F36] flex items-center justify-center text-[#F5B942] font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Gradient Boosting Optimization</h3>
                  <p className="text-gray-400 leading-relaxed">An XGBoost Regressor model was trained, iteratively minimizing the Root Mean Square Error (RMSE). This model captured complex non-linear relationships, such as the compounding effect of snow during rush hour vs. off-peak hours.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#12161B] border border-[#2A2F36] rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Architecture</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#F5B942]"></div> Inference-only API serving layer</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#F5B942]"></div> Versioned, serialized `.joblib` model artifact</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#F5B942]"></div> Dynamic metadata alignment module</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#F5B942]"></div> Decoupled SPA React frontend</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#F5B942]"></div> RESTful HTTP communication</li>
              </ul>
            </div>
            <div className="bg-[#12161B] border border-[#2A2F36] rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> Python & Scikit-Learn</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> XGBoost Regressor</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> MLflow (Experiment Tracking)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> FastAPI & Uvicorn</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> React, Vite, TailwindCSS, Framer Motion</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </PageContainer>
    </div>
  );
};

export default About;
