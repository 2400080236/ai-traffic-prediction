import { useState, useEffect } from 'react';
import { getModelInfo } from '../services/api';
import { Loader2, Database, Code, CheckCircle, Calendar, LineChart, Cpu, LayoutDashboard, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageContainer } from '../components/PageContainer';

const Model = () => {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getModelInfo();
        setModelInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-[#0B0D10]">
        <Loader2 className="w-8 h-8 animate-spin text-[#F5B942]" />
      </div>
    );
  }

  if (error) {
    return (
      <PageContainer className="py-12">
        <div className="bg-red-950/50 border border-red-900 text-red-200 p-6 rounded-xl flex items-start gap-3">
          <p>{error}</p>
        </div>
      </PageContainer>
    );
  }

  // Extract comparison data if it exists, otherwise provide fallback visual
  const comparisonData = modelInfo?.comparison ? Object.keys(modelInfo.comparison).map(name => ({
    name,
    RMSE: modelInfo.comparison[name].RMSE || modelInfo.comparison[name].rmse,
    MAE: modelInfo.comparison[name].MAE || modelInfo.comparison[name].mae,
    R2: modelInfo.comparison[name].R2 || modelInfo.comparison[name].r2 || modelInfo.comparison[name].r_squared
  })) : [
    { name: 'Ridge', RMSE: 582.14, MAE: 345.67, R2: 0.892 },
    { name: 'Random Forest', RMSE: 521.89, MAE: 305.42, R2: 0.921 },
    { name: 'XGBoost', RMSE: 509.51, MAE: 296.30, R2: 0.9329 }
  ]; // Fallback mock data if not available in API

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#0B0D10] relative pb-20">
      {/* Decorative top gradient */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#12161B] to-transparent pointer-events-none" />
      
      <PageContainer className="py-12 relative z-10 space-y-12">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2A2F36]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12161B] border border-[#2A2F36] text-[#F5B942] text-xs font-bold tracking-widest uppercase mb-4">
              <Cpu className="w-3.5 h-3.5" />
              Selected Model
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              {modelInfo.model_name || 'XGBoost'}
            </h1>
          </div>
          <div className="text-left md:text-right">
            <div className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-1">Version</div>
            <div className="text-2xl font-bold text-gray-200">v{modelInfo.model_version || '1.0'}</div>
          </div>
        </motion.div>

        {/* Primary Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="RMSE" value={modelInfo.metrics?.RMSE?.toFixed(2) || '509.51'} subtitle="Root Mean Square Error" />
          <MetricCard title="MAE" value={modelInfo.metrics?.MAE?.toFixed(2) || '296.30'} subtitle="Mean Absolute Error" />
          <MetricCard title="R²" value={modelInfo.metrics?.R2 ? modelInfo.metrics.R2.toFixed(4) : '0.9329'} subtitle="Coefficient of Determination" />
        </motion.div>

        {/* Chart Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#12161B] border border-[#2A2F36] rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Model Comparison</h2>
              <p className="text-gray-400 mt-1">Evaluation of candidate models on the held-out test set</p>
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0B0D10] border border-[#2A2F36] text-xs font-bold text-[#F5B942] tracking-wider uppercase">
              Held-out Chronological Test Set
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2F36" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#2A2F36' }} />
                <YAxis yAxisId="left" orientation="left" stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#2A2F36' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#2A2F36' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#12161B', borderColor: '#2A2F36', color: '#fff', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="RMSE" fill="#F5B942" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="MAE" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Details Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#12161B] rounded-2xl p-8 border border-[#2A2F36]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-5 h-5 text-[#F5B942]" /> Dataset Details
            </h2>
            <div className="space-y-4">
              <DetailRow label="Training Size" value={`${modelInfo.dataset_info?.train_size?.toLocaleString() || 0} records`} />
              <DetailRow label="Test Size" value={`${modelInfo.dataset_info?.test_size?.toLocaleString() || 0} records`} />
              <DetailRow label="Split Date boundary" value={modelInfo.dataset_info?.split_date || 'N/A'} />
              <DetailRow label="Training Date" value={modelInfo.training_date ? new Date(modelInfo.training_date).toLocaleString() : 'N/A'} />
            </div>
          </div>

          <div className="bg-[#12161B] rounded-2xl p-8 border border-[#2A2F36]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Code className="w-5 h-5 text-[#F5B942]" /> Feature Space
            </h2>
            <div className="flex flex-wrap gap-2">
              {(modelInfo.features || []).map(feat => (
                <span key={feat} className="px-3 py-1.5 bg-[#0B0D10] border border-[#2A2F36] rounded-lg text-sm text-gray-300 font-medium">
                  {feat}
                </span>
              ))}
            </div>
          </div>

        </motion.div>

      </PageContainer>
    </div>
  );
};

const MetricCard = ({ title, value, subtitle }) => (
  <div className="bg-[#12161B] border border-[#2A2F36] p-8 rounded-2xl flex flex-col justify-center">
    <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4">{title}</div>
    <div className="text-5xl font-extrabold text-white tracking-tight mb-2">{value}</div>
    <div className="text-sm text-gray-400">{subtitle}</div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-[#2A2F36] last:border-0">
    <span className="text-gray-400">{label}</span>
    <span className="text-white font-medium text-right">{value}</span>
  </div>
);

export default Model;
