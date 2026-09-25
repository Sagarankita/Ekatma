'use client'

import React, { useState, useEffect } from 'react'
import { Icon, inputBase, inputDefault, inputError } from './PublicChrome'

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[520px] mx-auto px-4 py-10">
      <div className="bg-white border border-[#d1d9e0] rounded shadow-sm">
        {children}
      </div>
    </div>
  )
}

// ─── Auth Card Header ─────────────────────────────────────────────────────────
function AuthCardHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="px-8 py-6 border-b border-[#d1d9e0] bg-[#f8f9fb]">
      <h1 className="text-xl font-bold text-[#1a3a5c]">{title}</h1>
      <p className="text-sm text-[#6b7a8d] mt-1">{subtitle}</p>
    </div>
  )
}

// ─── Field + Error helper ─────────────────────────────────────────────────────
function Field({ label, required, children, error, hint }: {
  label: string, required?: boolean, children: React.ReactNode, error?: string, hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#374151] mb-1">
        {label}{required && <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
          <Icon.AlertCircle /> {error}
        </p>
      )}
      {hint && !error && <p className="mt-1 text-xs text-[#6b7a8d]">{hint}</p>}
    </div>
  )
}

// ─── Password Input ───────────────────────────────────────────────────────────
function PasswordInput({ id, value, onChange, placeholder, error }: {
  id: string, value: string, onChange: (v: string) => void, placeholder: string, error?: string
}) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${error ? inputError : inputDefault} pr-10`}
        aria-invalid={!!error}
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa5b4] hover:text-[#4a5568] transition-colors"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <Icon.EyeOff /> : <Icon.Eye />}
      </button>
    </div>
  )
}

// ─── Industrial Login Page ────────────────────────────────────────────────────
export function IndustrialLoginPage({
  onSignUp,
  onLoginSuccess,
  onBack,
  registeredEmail,
}: {
  onSignUp: () => void
  onLoginSuccess: () => void
  onBack: () => void
  registeredEmail?: string
}) {
  const [email, setEmail] = useState(registeredEmail ?? '')
  useEffect(() => {
    if (registeredEmail) setEmail(registeredEmail)
  }, [registeredEmail])
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)
  const [successFlash, setSuccessFlash] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!email.trim()) e.email = 'Email ID is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.'
    if (!password) e.password = 'Password is required.'
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Accept any non-empty password for demo
      if (password.length >= 1) {
        setSuccessFlash(true)
        setTimeout(() => onLoginSuccess(), 800)
      } else {
        setErrors({ general: 'Incorrect email ID or password. Please try again.' })
      }
    }, 1200)
  }

  return (
    <AuthCard>
      <div className="px-8 py-5 border-b border-[#d1d9e0] bg-[#f8f9fb] flex items-center gap-3">
        <button onClick={onBack} className="text-[#6b7a8d] hover:text-[#1a3a5c] transition-colors" aria-label="Back to portal">
          <Icon.ChevronLeft />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Industrial Login</h1>
          <p className="text-sm text-[#6b7a8d] mt-0.5">Sign in to access your EKATMA account.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4" noValidate>
        {errors.general && (
          <div role="alert" className="flex items-start gap-3 p-3 rounded border-l-4 bg-red-50 border-red-400">
            <span className="text-red-600 shrink-0 mt-0.5"><Icon.AlertCircle /></span>
            <p className="text-sm text-red-800">{errors.general}</p>
          </div>
        )}
        {successFlash && (
          <div role="status" className="flex items-start gap-3 p-3 rounded border-l-4 bg-green-50 border-green-400">
            <span className="text-green-600 shrink-0 mt-0.5"><Icon.CheckCircle /></span>
            <p className="text-sm text-green-800 font-medium">Login successful. Redirecting…</p>
          </div>
        )}
        <Field label="Email ID" required error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            className={errors.email ? inputError : inputDefault}
            aria-invalid={!!errors.email}
            aria-required="true"
            autoComplete="email"
          />
        </Field>
        <Field label="Password" required error={errors.password}>
          <PasswordInput id="login-password" value={password} onChange={setPassword} placeholder="Enter your password" error={errors.password} />
        </Field>
        <div className="pt-1">
          <button
            type="submit"
            disabled={loading || successFlash}
            className="w-full flex items-center justify-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <><Icon.Loader /> Signing in…</> : 'Login'}
          </button>
        </div>
        <p className="text-sm text-center text-[#6b7a8d]">
          New user?{' '}
          <button type="button" onClick={onSignUp} className="text-[#1a56db] font-medium hover:underline focus:outline-none focus-visible:underline">
            Sign up first
          </button>
        </p>
      </form>
    </AuthCard>
  )
}

// ─── Create Account / OTP Page ────────────────────────────────────────────────
type OtpState = 'email-entry' | 'otp-entry' | 'verified'

export function CreateAccountPage({
  onVerified,
  onBack,
}: {
  onVerified: (email: string) => void
  onBack: () => void
}) {
  const [otpState, setOtpState] = useState<OtpState>('email-entry')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [emailError, setEmailError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [otpSentMsg, setOtpSentMsg] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const validateEmail = () => {
    if (!email.trim()) return 'Email ID is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
    return ''
  }

  const handleSendOtp = () => {
    const err = validateEmail()
    if (err) { setEmailError(err); return }
    setEmailError('')
    setSendingOtp(true)
    setTimeout(() => {
      setSendingOtp(false)
      setOtpState('otp-entry')
      setOtpSentMsg(true)
      setCountdown(30)
    }, 1000)
  }

  const handleVerify = () => {
    if (!otp.trim()) { setOtpError('Please enter the OTP sent to your email.'); return }
    if (otp.trim() === '000000') { setOtpError('OTP has expired. Please request a new OTP.'); return }
    if (otp.trim().length !== 6 || !/^\d+$/.test(otp.trim())) { setOtpError('Invalid OTP. Please check and try again.'); return }
    setOtpError('')
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setOtpState('verified')
      setTimeout(() => onVerified(email), 1200)
    }, 1200)
  }

  const handleResend = () => {
    setOtp('')
    setOtpError('')
    setCountdown(30)
    setOtpSentMsg(true)
  }

  return (
    <AuthCard>
      <div className="px-8 py-5 border-b border-[#d1d9e0] bg-[#f8f9fb] flex items-center gap-3">
        <button onClick={onBack} className="text-[#6b7a8d] hover:text-[#1a3a5c] transition-colors" aria-label="Back to login">
          <Icon.ChevronLeft />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Create Account</h1>
          <p className="text-sm text-[#6b7a8d] mt-0.5">Verify your email address to create your account.</p>
        </div>
      </div>

      <div className="px-8 py-6 space-y-4">
        {/* Verified success state */}
        {otpState === 'verified' && (
          <div role="status" className="flex items-start gap-3 p-4 rounded border-l-4 bg-green-50 border-green-400">
            <span className="text-green-600 shrink-0 mt-0.5"><Icon.CheckCircle /></span>
            <div>
              <p className="text-sm font-semibold text-green-800">Email verified successfully.</p>
              <p className="text-xs text-green-700 mt-0.5">Redirecting to complete registration…</p>
            </div>
          </div>
        )}

        {/* OTP sent info */}
        {otpSentMsg && otpState === 'otp-entry' && (
          <div role="status" className="flex items-start gap-3 p-3 rounded border-l-4 bg-blue-50 border-blue-300">
            <span className="text-blue-600 shrink-0 mt-0.5"><Icon.Mail /></span>
            <p className="text-sm text-blue-800">OTP has been sent to your email address.</p>
          </div>
        )}

        {/* Email field — always visible, read-only after OTP sent */}
        <Field label="Email ID" required error={otpState === 'email-entry' ? emailError : undefined}>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setEmailError('') }}
            placeholder="Enter your email ID"
            readOnly={otpState !== 'email-entry'}
            className={`${otpState === 'email-entry' ? (emailError ? inputError : inputDefault) : `${inputBase} border-[#d1d9e0] bg-[#f8f9fb] text-[#6b7a8d] cursor-not-allowed`}`}
            aria-invalid={!!emailError}
            aria-required="true"
            autoComplete="email"
          />
        </Field>

        {/* OTP field */}
        {otpState !== 'email-entry' && (
          <Field label="OTP" required error={otpError} hint="Enter the 6-digit OTP sent to your email.">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setOtpError('') }}
              placeholder="Enter OTP"
              className={otpError ? inputError : inputDefault}
              aria-invalid={!!otpError}
              aria-required="true"
              readOnly={otpState === 'verified'}
            />
          </Field>
        )}

        {/* Resend OTP */}
        {otpState === 'otp-entry' && (
          <p className="text-xs text-[#6b7a8d]">
            {countdown > 0 ? (
              <>Resend OTP in <span className="font-semibold text-[#1a3a5c]">{countdown}s</span></>
            ) : (
              <button type="button" onClick={handleResend} className="text-[#1a56db] font-medium hover:underline focus:outline-none focus-visible:underline">
                Resend OTP
              </button>
            )}
          </p>
        )}

        {/* Action button */}
        {otpState === 'email-entry' && (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={sendingOtp}
            className="w-full flex items-center justify-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sendingOtp ? <><Icon.Loader /> Sending OTP…</> : 'Send OTP'}
          </button>
        )}

        {otpState === 'otp-entry' && (
          <button
            type="button"
            onClick={handleVerify}
            disabled={verifying}
            className="w-full flex items-center justify-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {verifying ? <><Icon.Loader /> Verifying…</> : 'Verify OTP'}
          </button>
        )}
      </div>
    </AuthCard>
  )
}

// ─── Complete Registration Page ───────────────────────────────────────────────
const MH_DISTRICTS = ['Pune', 'Mumbai City', 'Mumbai Suburban', 'Thane', 'Nashik', 'Aurangabad', 'Nagpur', 'Solapur', 'Kolhapur']
const MH_TALUKAS = ['Haveli', 'Mulshi', 'Maval', 'Junnar', 'Shirur']
const MH_VILLAGES = ['Aundh', 'Baner', 'Wakad', 'Hinjewadi', 'Pimple Saudagar']

export function CompleteRegistrationPage({
  verifiedEmail,
  onSuccess,
  onBack,
}: {
  verifiedEmail: string
  onSuccess: () => void
  onBack: () => void
}) {
  type Form = {
    mobile: string; firstName: string; middleName: string; lastName: string
    aadhaar: string; dob: string; address: string; state: string; district: string
    taluka: string; village: string; pincode: string; password: string; confirmPassword: string
    terms: boolean
  }

  const [form, setForm] = useState<Form>({
    mobile: '', firstName: '', middleName: '', lastName: '',
    aadhaar: '', dob: '', address: '', state: '', district: '',
    taluka: '', village: '', pincode: '', password: '', confirmPassword: '', terms: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: keyof Form, v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }))

  // Password requirement checks
  const pwReqs = {
    length:    form.password.length >= 8,
    upper:     /[A-Z]/.test(form.password),
    lower:     /[a-z]/.test(form.password),
    digit:     /\d/.test(form.password),
    special:   /[^A-Za-z0-9]/.test(form.password),
  }
  const pwValid = Object.values(pwReqs).every(Boolean)

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {}
    if (!form.mobile.match(/^\d{10}$/)) e.mobile = 'Enter a valid 10-digit mobile number.'
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.aadhaar.match(/^\d{12}$/) && !form.aadhaar.match(/^\d{16}$/)) e.aadhaar = 'Enter a valid 12-digit Aadhaar or 16-digit Virtual ID.'
    if (!form.dob) e.dob = 'Date of birth is required.'
    if (!form.address.trim()) e.address = 'Communication address is required.'
    if (!form.state) e.state = 'Please select a state.'
    if (!form.district) e.district = 'Please select a district.'
    if (!form.taluka) e.taluka = 'Please select a taluka.'
    if (!form.village) e.village = 'Please select a village.'
    if (!pwValid) e.password = 'Password does not meet the requirements.'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.'
    if (!form.terms) e.terms = 'You must accept the terms and conditions.'
    return e
  }

  const canSubmit = pwValid && form.terms && !loading

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess() }, 1400)
  }

  const reqRow = (met: boolean, label: string) => (
    <li className={`flex items-center gap-1.5 ${met ? 'text-green-700' : 'text-[#6b7a8d]'}`}>
      {met
        ? <span className="text-green-600"><Icon.CheckCircle /></span>
        : <span className="w-4 h-4 rounded-full border border-[#d1d9e0] inline-block shrink-0" />}
      {label}
    </li>
  )

  return (
    <div className="max-w-[820px] mx-auto px-4 py-10">
      <div className="bg-white border border-[#d1d9e0] rounded shadow-sm">
        {/* Header */}
        <div className="px-8 py-5 border-b border-[#d1d9e0] bg-[#f8f9fb] flex items-center gap-3">
          <button onClick={onBack} className="text-[#6b7a8d] hover:text-[#1a3a5c] transition-colors" aria-label="Back">
            <Icon.ChevronLeft />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Complete Registration</h1>
            <p className="text-sm text-[#6b7a8d] mt-0.5">Enter your details to create your EKATMA account.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8" noValidate>
          {/* ── Email (verified, read-only) ── */}
          <section aria-labelledby="reg-email-heading">
            <h2 id="reg-email-heading" className="text-sm font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4">Email</h2>
            <Field label="Email ID" required>
              <div className="relative">
                <input
                  type="email"
                  value={verifiedEmail}
                  readOnly
                  className={`${inputBase} border-[#d1d9e0] bg-[#f8f9fb] text-[#6b7a8d] cursor-not-allowed pr-24`}
                  aria-readonly="true"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5">
                  <Icon.CheckCircle /> Verified
                </span>
              </div>
            </Field>
          </section>

          <div className="border-t border-[#e8edf2]" />

          {/* ── Personal Details ── */}
          <section aria-labelledby="reg-personal-heading">
            <h2 id="reg-personal-heading" className="text-sm font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Mobile No." required error={errors.mobile}>
                <input type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter your mobile number" maxLength={10}
                  className={errors.mobile ? inputError : inputDefault} aria-invalid={!!errors.mobile} />
              </Field>

              <Field label="First Name" required error={errors.firstName}>
                <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className={errors.firstName ? inputError : inputDefault} aria-invalid={!!errors.firstName} />
              </Field>

              <Field label="Middle Name">
                <input type="text" value={form.middleName} onChange={e => set('middleName', e.target.value)}
                  placeholder="Enter your middle name" className={inputDefault} />
              </Field>

              <Field label="Last Name" required error={errors.lastName}>
                <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.lastName ? inputError : inputDefault} aria-invalid={!!errors.lastName} />
              </Field>

              <Field label="Aadhaar No. / Virtual ID" required error={errors.aadhaar}>
                <input type="text" inputMode="numeric" value={form.aadhaar} onChange={e => set('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="Enter your Aadhaar No. / Virtual ID" maxLength={16}
                  className={errors.aadhaar ? inputError : inputDefault} aria-invalid={!!errors.aadhaar} />
              </Field>

              <Field label="Date of Birth" required error={errors.dob}>
                <div className="relative">
                  <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className={`${errors.dob ? inputError : inputDefault} pr-8`} aria-invalid={!!errors.dob} />
                </div>
              </Field>
            </div>
          </section>

          <div className="border-t border-[#e8edf2]" />

          {/* ── Address Details ── */}
          <section aria-labelledby="reg-address-heading">
            <h2 id="reg-address-heading" className="text-sm font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4">Address Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="sm:col-span-2 lg:col-span-3">
                <Field label="Communication Address" required error={errors.address}>
                  <textarea rows={2} value={form.address} onChange={e => set('address', e.target.value)}
                    placeholder="Enter your communication address"
                    className={`${errors.address ? inputError : inputDefault} resize-none`} aria-invalid={!!errors.address} />
                </Field>
              </div>

              <Field label="State" required error={errors.state}>
                <select value={form.state} onChange={e => set('state', e.target.value)}
                  className={errors.state ? inputError : inputDefault} aria-invalid={!!errors.state}>
                  <option value="">Select a State</option>
                  <option value="MH">Maharashtra</option>
                  <option value="GJ">Gujarat</option>
                  <option value="KA">Karnataka</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="DL">Delhi</option>
                </select>
              </Field>

              <Field label="District" required error={errors.district}>
                <select value={form.district} onChange={e => set('district', e.target.value)}
                  className={errors.district ? inputError : inputDefault} aria-invalid={!!errors.district}>
                  <option value="">Select a District</option>
                  {MH_DISTRICTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>

              <Field label="Taluka" required error={errors.taluka}>
                <select value={form.taluka} onChange={e => set('taluka', e.target.value)}
                  className={errors.taluka ? inputError : inputDefault} aria-invalid={!!errors.taluka}>
                  <option value="">Select a Taluka</option>
                  {MH_TALUKAS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>

              <Field label="Village" required error={errors.village}>
                <select value={form.village} onChange={e => set('village', e.target.value)}
                  className={errors.village ? inputError : inputDefault} aria-invalid={!!errors.village}>
                  <option value="">Select a Village</option>
                  {MH_VILLAGES.map(v => <option key={v}>{v}</option>)}
                </select>
              </Field>

              <Field label="Pincode">
                <input type="text" inputMode="numeric" value={form.pincode} onChange={e => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter your pincode" maxLength={6} className={inputDefault} />
              </Field>
            </div>
          </section>

          <div className="border-t border-[#e8edf2]" />

          {/* ── Password Creation ── */}
          <section aria-labelledby="reg-pw-heading">
            <h2 id="reg-pw-heading" className="text-sm font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4">Password Creation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Password" required error={errors.password}>
                <PasswordInput id="reg-password" value={form.password} onChange={v => set('password', v)} placeholder="Enter your password" error={errors.password} />
              </Field>
              <Field label="Password Confirmation" required error={errors.confirmPassword}>
                <PasswordInput id="reg-confirm" value={form.confirmPassword} onChange={v => set('confirmPassword', v)} placeholder="Enter your confirm password" error={errors.confirmPassword} />
              </Field>
            </div>

            {/* Password requirements panel */}
            <div className="mt-3 p-3 bg-[#f8f9fb] border border-[#d1d9e0] rounded">
              <p className="text-xs font-medium text-[#374151] mb-2">Password requirements:</p>
              <ul className="space-y-1 text-xs">
                {reqRow(pwReqs.length,  'Minimum 8 characters')}
                {reqRow(pwReqs.upper,   'At least one uppercase letter (A–Z)')}
                {reqRow(pwReqs.lower,   'At least one lowercase letter (a–z)')}
                {reqRow(pwReqs.digit,   'At least one digit (0–9)')}
                {reqRow(pwReqs.special, 'At least one special character')}
              </ul>
            </div>
          </section>

          <div className="border-t border-[#e8edf2]" />

          {/* ── Terms ── */}
          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={e => set('terms', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#1a3a5c] shrink-0"
                aria-required="true"
              />
              <span className="text-sm text-[#374151]">
                I understand this is a demo registration.
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-600 flex items-center gap-1 pl-6" role="alert">
                <Icon.AlertCircle /> {errors.terms}
              </p>
            )}
          </div>

          {/* ── Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex items-center justify-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <><Icon.Loader /> Registering…</> : 'Register'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-6 py-2.5 rounded hover:bg-[#f0f4f8] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Registration Success Page ────────────────────────────────────────────────
export function RegistrationSuccessPage({ onGoToLogin }: { onGoToLogin: () => void }) {
  return (
    <AuthCard>
      <div className="px-8 py-10 text-center space-y-4">
        <div className="flex justify-center">
          <span className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-green-600">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Registration Successful</h1>
          <p className="text-sm text-[#6b7a8d] mt-2 max-w-xs mx-auto">
            Your account has been created successfully. You can now log in using your email ID and password.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={onGoToLogin}
            className="bg-[#1a3a5c] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    </AuthCard>
  )
}

