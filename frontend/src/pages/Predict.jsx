import { useState, forwardRef } from 'react';
import { predictTraffic } from '../services/api';
import { Loader2, Car, Clock, Thermometer, CloudRain, Cloud, Snowflake, Calendar, AlertCircle, ChevronDown, Check, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Select from '@radix-ui/react-select';
import { PageContainer } from '../components/PageContainer';

const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon }) => (
  <Select.Root value={value.toString()} onValueChange={onChange}>
    <Select.Trigger className="w-full flex items-center justify-between bg-[#0B0D10] border border-[#2A2F36] rounded-xl px-4 py-3 text-white hover:border-[#F5B942]/50 focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-colors outline-none data-[placeholder]:text-gray-500">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        <Select.Value placeholder={placeholder} />
      </div>
      <Select.Icon>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-[#12161B] rounded-xl border border-[#2A2F36] shadow-xl z-50">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-[#12161B] text-white cursor-default">
          <ChevronDown className="w-4 h-4 rotate-180" />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-1">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value.toString()}>
              {opt.label}
            </SelectItem>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-[#12161B] text-white cursor-default">
          <ChevronDown className="w-4 h-4" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={`text-sm leading-none text-gray-200 rounded-lg flex items-center h-9 pr-8 pl-8 relative select-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#F5B942] data-[highlighted]:text-black transition-colors ${className}`}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-2 w-4 inline-flex items-center justify-center">
        <Check className="w-4 h-4" />
      </Select.ItemIndicator>
    </Select.Item>
  );
});
SelectItem.displayName = 'SelectItem';

const Predict = () => {
  const [formData, setFormData] = useState({
    temp: 288.5,
    rain_1h: 0.0,
    snow_1h: 0.0,
    clouds_all: 40,
    weather_main: 'Clear',
    hour_of_day: 8,
    day_of_week: 2,
    month: 10,
    is_holiday: 0
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const weatherOptions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Mist', 'Haze', 'Fog', 'Snow', 'Thunderstorm'].map(w => ({ label: w, value: w }));
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, i) => ({ label: d, value: i }));
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => ({ label: m, value: i + 1 }));
  const hours = Array.from({ length: 24 }, (_, i) => ({ label: `${i.toString().padStart(2, '0')}:00`, value: i }));

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weather_main' ? value : Number(value)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await predictTraffic(formData);
      setResult({ ...data, formData: { ...formData } }); // Keep form data for display
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (val) => days.find(d => d.value === val)?.label;
  const getHourFormat = (val) => `${val.toString().padStart(2, '0')}:00`;

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#0B0D10] relative">
      <PageContainer className="py-12 relative z-10">
        
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Traffic Prediction</h1>
          <p className="text-lg text-gray-400">Configure temporal and meteorological parameters to forecast hourly traffic volume with XGBoost.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: FORM */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* TIME SECTION */}
              <div className="bg-[#12161B] border border-[#2A2F36] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#0B0D10] border border-[#2A2F36] rounded-lg text-[#F5B942]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-wide">Time & Date</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Hour of Day</label>
                    <CustomSelect value={formData.hour_of_day} onChange={(val) => handleChange('hour_of_day', val)} options={hours} icon={Clock} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Day of Week</label>
                    <CustomSelect value={formData.day_of_week} onChange={(val) => handleChange('day_of_week', val)} options={days} icon={Calendar} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Month</label>
                    <CustomSelect value={formData.month} onChange={(val) => handleChange('month', val)} options={months} icon={Calendar} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Holiday</label>
                    <CustomSelect value={formData.is_holiday} onChange={(val) => handleChange('is_holiday', val)} options={[{label: 'Regular Day', value: 0}, {label: 'Public Holiday', value: 1}]} icon={Calendar} />
                  </div>
                </div>
              </div>

              {/* WEATHER SECTION */}
              <div className="bg-[#12161B] border border-[#2A2F36] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#0B0D10] border border-[#2A2F36] rounded-lg text-[#F5B942]">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-wide">Weather Conditions</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Condition</label>
                    <CustomSelect value={formData.weather_main} onChange={(val) => handleChange('weather_main', val)} options={weatherOptions} icon={Cloud} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                      <span>Temperature</span>
                      <span className="text-[#F5B942]">Kelvin</span>
                    </label>
                    <div className="relative group">
                      <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#F5B942] transition-colors" />
                      <input type="number" step="0.1" name="temp" value={formData.temp} onChange={handleInputChange} className="w-full bg-[#0B0D10] border border-[#2A2F36] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] outline-none transition-colors" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                      <span>Cloud Coverage</span>
                      <span className="text-[#F5B942]">%</span>
                    </label>
                    <div className="relative group">
                      <Cloud className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#F5B942] transition-colors" />
                      <input type="number" min="0" max="100" name="clouds_all" value={formData.clouds_all} onChange={handleInputChange} className="w-full bg-[#0B0D10] border border-[#2A2F36] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] outline-none transition-colors" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                      <span>Rainfall (1h)</span>
                      <span className="text-[#F5B942]">mm</span>
                    </label>
                    <div className="relative group">
                      <CloudRain className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#F5B942] transition-colors" />
                      <input type="number" step="0.1" name="rain_1h" value={formData.rain_1h} onChange={handleInputChange} className="w-full bg-[#0B0D10] border border-[#2A2F36] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] outline-none transition-colors" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                      <span>Snowfall (1h)</span>
                      <span className="text-[#F5B942]">mm</span>
                    </label>
                    <div className="relative group">
                      <Snowflake className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#F5B942] transition-colors" />
                      <input type="number" step="0.1" name="snow_1h" value={formData.snow_1h} onChange={handleInputChange} className="w-full bg-[#0B0D10] border border-[#2A2F36] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] outline-none transition-colors" required />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-950/50 border border-red-900 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-6 bg-[#F5B942] hover:bg-[#E5A932] disabled:bg-[#2A2F36] disabled:text-gray-500 text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(245,185,66,0.15)] disabled:shadow-none text-lg"
              >
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : 'Predict Traffic →'}
              </button>

            </form>
          </div>

          {/* RIGHT: FORECAST */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-[400px] bg-[#12161B] border border-[#2A2F36] border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDIwaDQwIiBzdHJva2U9IiNGNUI5NDIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNCA0Ii8+PC9zdmc+')] [background-size:20px_20px]" />
                    <div className="relative z-10 space-y-4">
                      <div className="text-xs font-bold tracking-widest text-gray-500 uppercase">Traffic Forecast</div>
                      <div className="w-16 h-0.5 bg-[#2A2F36] mx-auto"></div>
                      <p className="text-gray-400">Enter conditions to predict<br/>hourly volume</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-[#12161B] border border-[#F5B942]/30 shadow-[0_0_30px_rgba(245,185,66,0.1)] rounded-3xl overflow-hidden"
                  >
                    <div className="p-8 border-b border-[#2A2F36] bg-[#0B0D10]/50">
                      <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">Traffic Forecast</div>
                      <div className="flex flex-col items-center justify-center text-center py-6">
                        <motion.div 
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                          className="text-6xl font-extrabold text-white mb-2"
                        >
                          {result.predicted_traffic_volume.toLocaleString()}
                        </motion.div>
                        <div className="text-[#F5B942] font-medium tracking-widest uppercase text-sm">
                          {result.unit}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 space-y-4 bg-[#12161B]">
                      <div className="flex items-center justify-between py-2 border-b border-[#2A2F36]">
                        <span className="text-gray-400 flex items-center gap-2"><Cpu className="w-4 h-4"/> Model</span>
                        <span className="text-white font-medium">{result.model} · v1.0</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-[#2A2F36]">
                        <span className="text-gray-400 flex items-center gap-2"><Clock className="w-4 h-4"/> Time</span>
                        <span className="text-white font-medium">{getDayName(result.formData.day_of_week)} · {getHourFormat(result.formData.hour_of_day)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-[#2A2F36]">
                        <span className="text-gray-400 flex items-center gap-2"><Cloud className="w-4 h-4"/> Weather</span>
                        <span className="text-white font-medium">{result.formData.weather_main} · {result.formData.clouds_all}% clouds</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </PageContainer>
    </div>
  );
};

export default Predict;
