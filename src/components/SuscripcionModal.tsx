import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, CheckCircle, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuscripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: 'completo' | 'full' | 'ilimitado';
  region?: 'PE' | 'LA';
}

export default function SuscripcionModal({ isOpen, onClose, defaultPlan, region }: SuscripcionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'completo' | 'full' | 'ilimitado'>('full');
  const [selectedRegion, setSelectedRegion] = useState<'PE' | 'LA'>('PE');
  const [step, setStep] = useState(1); // 1: Info & Plan, 2: Checkout, 3: Success

  useEffect(() => {
    if (isOpen && defaultPlan) {
      setSelectedPlan(defaultPlan);
    }
  }, [isOpen, defaultPlan]);

  useEffect(() => {
    if (isOpen && region) {
      setSelectedRegion(region);
    }
  }, [isOpen, region]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Perú');
  
  // Credit card details (mock)
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const price = selectedPlan === 'completo' 
    ? (selectedRegion === 'PE' ? 749 : 199) 
    : (selectedPlan === 'full' 
      ? (selectedRegion === 'PE' ? 1099 : 299) 
      : (selectedRegion === 'PE' ? 1899 : 499));

  const currencySymbol = selectedRegion === 'PE' ? 'S/' : '$';
  const currencyCode = selectedRegion === 'PE' ? 'PEN' : 'USD';

  const planLabel = selectedPlan === 'completo' 
    ? 'PROGRAMA COMPLETO' 
    : (selectedPlan === 'full' ? 'PROGRAMA FULL' : 'PROGRAMA ILIMITADO (2 AÑOS)');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !email) return;
      setStep(2);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setFullName('');
    setEmail('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-brand-surface border border-brand-border rounded-xl max-w-lg w-full overflow-hidden text-left shadow-2xl flex flex-col justify-between max-h-[95vh] transition-theme"
          >
            {/* Header banner */}
            <div className="relative p-6 border-b border-brand-border bg-brand-card flex justify-between items-center shrink-0 transition-theme">
              <div>
                <span className="font-mono text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded border border-brand-gold/10 tracking-widest uppercase transition-colors">
                  {planLabel}
                </span>
                <h3 className="text-xl font-bold text-brand-heading mt-1 transition-colors">Matrícula EDUMIN</h3>
              </div>
              <button
                onClick={handleResetAndClose}
                className="p-1.5 hover:bg-brand-border rounded-full text-brand-subtext hover:text-brand-heading transition-theme cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Step Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] transition-colors">
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  {/* Plan Switcher */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block">Selecciona tu Programa</label>
                    <div className="bg-brand-dark p-1.5 rounded-lg border border-brand-border flex flex-col sm:flex-row gap-2 transition-theme">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('completo')}
                        className={`py-2 px-3 text-xs font-mono font-bold uppercase rounded transition-colors cursor-pointer flex-grow ${
                          selectedPlan === 'completo' ? 'bg-amber-700/80 text-white shadow' : 'text-brand-subtext hover:text-brand-heading'
                        }`}
                      >
                        Completo
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('full')}
                        className={`py-2 px-3 text-xs font-mono font-bold uppercase rounded transition-colors cursor-pointer flex-grow ${
                          selectedPlan === 'full' ? 'bg-amber-700/80 text-white shadow' : 'text-brand-subtext hover:text-brand-heading'
                        }`}
                      >
                        Full
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('ilimitado')}
                        className={`py-2 px-3 text-xs font-mono font-bold uppercase rounded transition-colors cursor-pointer flex-grow ${
                          selectedPlan === 'ilimitado' ? 'bg-amber-700/80 text-white shadow' : 'text-brand-subtext hover:text-brand-heading'
                        }`}
                      >
                        Ilimitado (2 Años)
                      </button>
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="text-center bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-lg relative overflow-hidden transition-theme">
                    <span className="text-3xl sm:text-4xl font-black text-brand-gold font-mono">{currencySymbol}{price}</span>
                    <span className="text-xs text-brand-subtext font-mono ml-1">{currencyCode} (Pago Único)</span>
                    <p className="text-[10px] text-brand-subtext mt-2 font-mono uppercase tracking-widest transition-colors">
                      {selectedPlan === 'ilimitado' ? 'Acceso ilimitado por 24 meses' : 'Matrícula al diplomado de especialización'}
                    </p>
                  </div>

                  {/* Basic information */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1">Nombre y Apellidos *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ing. Carlos Mendoza"
                        className="w-full bg-brand-card border border-brand-border rounded p-2.5 text-sm text-brand-text placeholder-brand-subtext/40 focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1">Tu Correo Institucional o Personal *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="carlos.mendoza@antamina.com"
                        className="w-full bg-brand-card border border-brand-border rounded p-2.5 text-sm text-brand-text placeholder-brand-subtext/40 focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1">País / Región de Residencia</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-brand-card border border-brand-border rounded p-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-gold transition-theme"
                      >
                        <option value="Perú">Perú</option>
                        <option value="Chile">Chile</option>
                        <option value="Colombia">Colombia</option>
                        <option value="México">México</option>
                        <option value="Otros">Otros (Global)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-border/40">
                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-600/90 hover:bg-amber-600 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-lg shadow-lg cursor-pointer active:scale-95 transition-all"
                    >
                      Continuar al Pago Seguro
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Secure credit card form */}
                  <div className="flex items-center gap-2 mb-4 text-[#eab308] text-xs font-mono bg-[#78350f]/15 p-3 rounded border border-[#78350f]/30">
                    <Lock size={14} className="shrink-0" />
                    <span>Transacción Encriptada 256-bit SSL segura</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1">Número de Tarjeta</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-brand-card border border-brand-border rounded p-2.5 pl-10 text-sm text-brand-text focus:outline-none focus:border-brand-gold transition-theme"
                        />
                        <CreditCard size={16} className="absolute left-3.5 top-3.5 text-brand-subtext/60" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1">Vencimiento</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full bg-brand-card border border-brand-border rounded p-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-gold text-center transition-theme"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1">CVV / Código</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="w-full bg-brand-card border border-brand-border rounded p-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-gold text-center transition-theme"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-brand-card border border-brand-border p-4 rounded-lg space-y-2 transition-theme">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-brand-subtext">Programa:</span>
                      <span className="text-brand-heading font-bold">{planLabel}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-brand-subtext">Inversión:</span>
                      <span className="text-brand-gold font-bold">{currencySymbol}{price} {currencyCode} (Pago Único)</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono border-t border-brand-border/40 pt-2 mt-2">
                      <span className="text-brand-heading font-black">Total a pagar:</span>
                      <span className="text-brand-heading font-black text-sm">{currencySymbol}{price} {currencyCode}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-border/40 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 border border-brand-border hover:bg-brand-border text-brand-subtext font-mono text-xs uppercase tracking-widest font-bold rounded-lg cursor-pointer transition-theme"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-2/3 py-3 bg-brand-gold hover:brightness-110 text-brand-dark font-mono text-xs uppercase tracking-widest font-bold rounded-lg shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={14} />
                          Pagar {currencySymbol}{price} {currencyCode}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-green-500">
                    <CheckCircle size={32} />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-brand-heading transition-colors">¡Matrícula Procesada con Éxito!</h4>
                    <p className="text-xs text-brand-subtext uppercase font-mono tracking-wider transition-colors">Código de Alumno: ED-${Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>

                  <p className="text-sm text-brand-subtext leading-relaxed max-w-sm mx-auto transition-colors">
                    Bienvenido, <span className="text-brand-heading font-bold">{fullName}</span>. Hemos enviado tu recibo electrónico de facturación y los accesos de inicio a tu casilla <span className="text-brand-heading font-bold">{email}</span>. Ya puedes comenzar a estudiar tu diplomado.
                  </p>

                  <div className="bg-brand-surface p-4 rounded-lg border border-brand-border flex gap-4 text-left transition-theme">
                    <Award size={20} className="text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-heading transition-colors">Beneficios del {planLabel}:</h4>
                      <p className="text-[10px] text-brand-subtext mt-1 transition-colors">
                        {selectedPlan === 'completo' && `1 Diplomado de alta especialización con diploma, 3 certificaciones adicionales de programas de alta especialización, 3 cursos asincrónicos, 1 certificado avalado por el CIP y acceso a bolsa de trabajo regular.`}
                        {selectedPlan === 'full' && `1 Diplomado de alta especialización con diploma, 3 certificaciones adicionales, 5 cursos asincrónicos, 1 certificado avalado por el CIP, acceso a bolsa de trabajo regular y exclusiva, y doble certificación internacional de San Ignacio University of Miami.`}
                        {selectedPlan === 'ilimitado' && `Diplomados asincrónicos ilimitados con certificados EDUMIN sin límite, acceso ilimitado a la plataforma, opción de certificar un diplomado con aval del CIP, acceso a bolsa de trabajo regular y exclusiva, y certificación internacional de San Ignacio University válida para un diplomado.`}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-border/40">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="w-full py-3 bg-brand-gold text-brand-dark font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:brightness-110 shadow-lg cursor-pointer active:scale-95 transition-all"
                    >
                      Comenzar a Estudiar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
