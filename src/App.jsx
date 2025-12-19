import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('journal')
  const [selectedChildId, setSelectedChildId] = useState('1')
  const [entries, setEntries] = useState(sampleEntries)
  const [formState, setFormState] = useState(initialFormState)
  const [videoPreview, setVideoPreview] = useState(null)

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setVideoPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setVideoPreview(url)
  }

  const handleSubmitEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      childId: selectedChildId,
      time: 'Just now',
      activity: formState.activity,
      location: formState.location,
      stressLevel: Number(formState.stressLevel),
      notes: formState.notes || 'No extra notes provided.',
      environment: {
        noise: formState.stressLevel >= 4 ? 'High' : 'Moderate',
        brightness: 'Mixed',
        crowd: 'Varies',
      },
    }
    setEntries([newEntry, ...entries])
    setFormState(initialFormState)
    setVideoPreview(null)
    alert('Entry saved. In the real system, this is where ML analysis runs.')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Sensory Trigger Journal (Video-Assisted)</h1>
          <p className="app-subtitle">
            Privacy-preserving, caregiver-in-the-loop tool for spotting sensory patterns over time.
          </p>
        </div>
        <ChildSelector
          selectedChildId={selectedChildId}
          onChange={setSelectedChildId}
        />
      </header>

      <main className="app-main">
        <section className="main-left">
          <Tabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === 'journal' ? (
            <JournalView
              formState={formState}
              setFormState={setFormState}
              onSubmit={handleSubmitEntry}
              videoPreview={videoPreview}
              onVideoChange={handleVideoChange}
            />
          ) : (
            <PatternsView entries={entries} />
          )}
        </section>
        <section className="main-right">
          <EntryTimeline entries={entries} />
        </section>
      </main>

      <footer className="app-footer">
        <span>Demo: no real video is uploaded, analytics are simulated for explanation.</span>
      </footer>
    </div>
  )
}

export default App

// ---------- Mock data & helpers ----------

const sampleEntries = [
  {
    id: 1,
    childId: '1',
    time: 'Today · 09:15',
    activity: 'Grocery store',
    location: 'Supermarket',
    stressLevel: 4,
    notes: 'Fluorescent lights + loud announcements, visible discomfort.',
    environment: {
      noise: 'High',
      brightness: 'Harsh',
      crowd: 'Busy',
    },
  },
  {
    id: 2,
    childId: '1',
    time: 'Yesterday · 19:30',
    activity: 'Reading time',
    location: 'Living room',
    stressLevel: 1,
    notes: 'Dim lights, white noise machine, very calm.',
    environment: {
      noise: 'Low',
      brightness: 'Soft',
      crowd: 'Family only',
    },
  },
]

const initialFormState = {
  activity: '',
  location: '',
  stressLevel: '3',
  duration: '15',
  notes: '',
  consentGiven: false,
}

// ---------- Components ----------

function ChildSelector({ selectedChildId, onChange }) {
  return (
    <div className="child-selector">
      <label htmlFor="child-select">Child profile</label>
      <select
        id="child-select"
        value={selectedChildId}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="1">Aarav · 7 yrs</option>
        <option value="2">Mia · 9 yrs</option>
      </select>
    </div>
  )
}

function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs">
      <button
        type="button"
        className={activeTab === 'journal' ? 'tab active' : 'tab'}
        onClick={() => onChange('journal')}
      >
        Journal entry
      </button>
      <button
        type="button"
        className={activeTab === 'patterns' ? 'tab active' : 'tab'}
        onClick={() => onChange('patterns')}
      >
        Patterns & insights
      </button>
    </div>
  )
}

function JournalView({
  formState,
  setFormState,
  onSubmit,
  videoPreview,
  onVideoChange,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="card">
      <h2>New video-assisted entry</h2>
      <p className="card-subtitle">
        30–90s clip + quick context. AI looks for recurring sensory patterns; you stay in control.
      </p>
      <form className="journal-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-section">
            <label className="field">
              <span>Upload short clip</span>
              <input
                type="file"
                accept="video/*"
                onChange={onVideoChange}
              />
              <small>Faces are not analysed; only motion + environment features.</small>
            </label>

            {videoPreview && (
              <div className="video-preview">
                <video src={videoPreview} controls muted />
              </div>
            )}
          </div>

          <div className="form-section">
            <label className="field">
              <span>Activity</span>
              <input
                type="text"
                name="activity"
                value={formState.activity}
                onChange={handleChange}
                placeholder="e.g. Grocery shopping, classroom, playground"
                required
              />
            </label>

            <label className="field">
              <span>Location</span>
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={handleChange}
                placeholder="Home, school, supermarket..."
                required
              />
            </label>

            <div className="field-row">
              <label className="field">
                <span>Observed stress level</span>
                <select
                  name="stressLevel"
                  value={formState.stressLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1 · Very calm</option>
                  <option value="2">2 · Mildly tense</option>
                  <option value="3">3 · Noticeable stress</option>
                  <option value="4">4 · Escalating</option>
                  <option value="5">5 · Meltdown / shutdown</option>
                </select>
              </label>

              <label className="field">
                <span>Duration (minutes)</span>
                <input
                  type="number"
                  min="1"
                  name="duration"
                  value={formState.duration}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="field">
              <span>Notes (optional)</span>
              <textarea
                name="notes"
                rows="3"
                value={formState.notes}
                onChange={handleChange}
                placeholder="What did you notice? Sounds, lights, crowd, child’s response..."
              />
            </label>

            <label className="consent-checkbox">
              <input
                type="checkbox"
                name="consentGiven"
                checked={formState.consentGiven}
                onChange={handleChange}
                required
              />
              <span>
                I confirm I have consent to capture this clip and understand it is used only for
                pattern analysis, not diagnosis.
              </span>
            </label>

            <button type="submit" className="primary-button">
              Save entry & simulate analysis
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function PatternsView({ entries }) {
  // In a real app, this would come from the backend / ML layer.
  const highStressRate = 68
  const noiseCorrelation = 0.74
  const brightnessCorrelation = 0.61

  return (
    <div className="patterns-grid">
      <div className="card">
        <h2>Top sensory trigger patterns</h2>
        <p className="card-subtitle">
          These insights are computed from anonymised features, not from facial identity.
        </p>
        <ul className="insight-list">
          <li>
            <span className="pill pill-red">High impact</span>
            <div>
              <strong>Loud, unpredictable noise</strong> appears in{' '}
              <strong>{highStressRate}%</strong> of higher-stress entries (level 4–5).
            </div>
          </li>
          <li>
            <span className="pill pill-amber">Consistent</span>
            <div>
              <strong>Harsh fluorescent lighting + crowd motion</strong> strongly co-occur with
              stress escalations.
            </div>
          </li>
          <li>
            <span className="pill pill-green">Protective</span>
            <div>
              <strong>Dim lighting + predictable low noise</strong> are present in most calm
              entries.
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2>Explainable correlations</h2>
        <p className="card-subtitle">
          Simple, transparent metrics you can discuss with clinicians and educators.
        </p>
        <div className="bar-chart">
          <Bar label="Noise spikes vs stress" value={noiseCorrelation} />
          <Bar label="Brightness changes vs stress" value={brightnessCorrelation} />
          <Bar label="Crowd motion vs stress" value={0.55} />
        </div>
      </div>

      <div className="card">
        <h2>Per-child sensory profile (demo)</h2>
        <p className="card-subtitle">
          Designed to support individualised support plans, not labels or diagnoses.
        </p>
        <div className="profile-tags">
          <div>
            <span className="profile-label">Aarav · 7 yrs</span>
            <div className="tag-row">
              <span className="tag tag-risk">High sensitivity to sudden noise</span>
              <span className="tag tag-risk">Crowded indoor spaces</span>
              <span className="tag tag-safe">Predictable routines</span>
            </div>
          </div>
          <div>
            <span className="profile-label">Mia · 9 yrs</span>
            <div className="tag-row">
              <span className="tag tag-risk">Visual clutter</span>
              <span className="tag tag-safe">Soft lighting</span>
              <span className="tag tag-safe">Movement breaks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bar({ label, value }) {
  const percentage = Math.round(value * 100)
  return (
    <div className="bar-row">
      <div className="bar-label">{label}</div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="bar-value">{percentage}%</div>
    </div>
  )
}

function EntryTimeline({ entries }) {
  return (
    <div className="card timeline-card">
      <h2>Recent entries</h2>
      <p className="card-subtitle">
        Each dot is a caregiver-labelled moment; AI adds environmental context on top.
      </p>
      <ul className="timeline-list">
        {entries.map((entry) => (
          <li key={entry.id} className="timeline-item">
            <div className="timeline-dot" data-level={entry.stressLevel} />
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-time">{entry.time}</span>
                <span className={`stress-chip level-${entry.stressLevel}`}>
                  Stress · {entry.stressLevel}/5
                </span>
              </div>
              <div className="timeline-meta">
                <strong>{entry.activity}</strong> · {entry.location}
              </div>
              <div className="timeline-tags">
                <span className="tag">
                  Noise: <strong>{entry.environment.noise}</strong>
                </span>
                <span className="tag">
                  Light: <strong>{entry.environment.brightness}</strong>
                </span>
                <span className="tag">
                  Crowd: <strong>{entry.environment.crowd}</strong>
                </span>
              </div>
              <p className="timeline-notes">{entry.notes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

