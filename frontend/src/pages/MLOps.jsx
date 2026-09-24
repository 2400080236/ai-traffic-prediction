import { motion } from 'framer-motion';
import { Database, Settings2, Cpu, LineChart, Target, Box, Zap, ArrowDown } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';

const MLOps = () => {
  const steps = [
    {
      id: "01",
      title: "DATASET",
      desc: "48,204 records covering traffic volume, weather conditions, holidays, and temporal data.",
      icon: Database,
      color: "#F5B942"
    },
    {
      id: "02",
      title: "PREPROCESSING",
      desc: "Imputation, cyclical encoding for time features, one-hot encoding for weather and holidays.",
      icon: Settings2,
      color: "#10B981"
    },
    {
      id: "03",
      title: "TRAINING",
      desc: "XGBoost Regressor optimized with objective 'reg:squarederror' over multiple iterations.",
      icon: Cpu,
      color: "#06B6D4"
    },
    {
      id: "04",
      title: "EXPERIMENT TRACKING",
      desc: "MLflow logs parameters, metrics (RMSE, MAE, R²), and model artifacts for reproducibility.",
      icon: LineChart,
      color: "#8B5CF6"
    },
    {
      id: "05",
      title: "MODEL SELECTION",
      desc: "XGBoost selected over Ridge and Random Forest based on held-out chronological test set.",
      icon: Target,
      color: "#EC4899"
    },
    {
      id: "06",
      title: "MODEL ARTIFACT",
      desc: "Serialized model saved as model.joblib alongside metadata.json for feature alignment.",
      icon: Box,
      color: "#F59E0B"
    },
    {
      id: "07",
      title: "FASTAPI & REACT",
      desc: "Serving real-time inferences via REST API to the React frontend dashboard.",
      icon: Zap,
      color: "#EF4444"
    }
  ];

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#0B0D10] relative pb-20">
      <PageContainer className="py-16 relative z-10">
        <div className="max-w-[1100px] mx-auto w-full">
          
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">MLOps Pipeline</h1>
            <p className="text-lg text-gray-400">Complete lifecycle from raw historical data to real-time React dashboard.</p>
          </div>

          <div className="space-y-4 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center"
              >
                <div className="w-full max-w-2xl bg-[#12161B] border border-[#2A2F36] rounded-2xl p-6 md:p-8 flex items-center gap-6 group hover:border-[#F5B942]/50 transition-colors">
                  <div 
                    className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center bg-[#0B0D10] border border-[#2A2F36] group-hover:scale-110 transition-transform"
                    style={{ color: step.color }}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">STEP {step.id}</div>
                    <h3 className="text-xl font-bold text-white tracking-wide mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="h-10 my-2 flex items-center justify-center text-[#2A2F36]">
                    <ArrowDown className="w-6 h-6 animate-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </PageContainer>
    </div>
  );
};

export default MLOps;
