import { createClient } from '@supabase/supabase-js';
import { User, Consultation, Message, Disease } from '../types';

const SUPABASE_URL = 'https://mqntfkazmhhlzkrstwxw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbnRma2F6bWhobHprcnN0d3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NzQ0MDAsImV4cCI6MjA2LjA0NjQwMDB9.Z7uI9Qq0Z0K8u8W3L7N5vH9yT2r6X8c4P1m9B0n2D';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const generateMedicalDB = (): Disease[] => {
  const base: Disease[] = [
    {
      id: '1', name: 'Common Cold', category: 'Respiratory', severity: 'mild',
      description: 'Viral infection of the upper respiratory tract.',
      typicalDuration: '7-10 days',
      symptoms: [{name:'runny nose', frequency:'very common'}, {name:'cough', frequency:'common'}, {name:'sneezing', frequency:'very common'}],
      diagnosticQuestions: ['Do you have a sore throat?', 'Is your nose runny?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Acetaminophen', dosage_adult: '500mg', dosage_pediatric: '250mg', frequency: '6h', purpose: 'Fever'}], home_care: ['Rest', 'Fluids'], foods_to_eat: ['Soup'], foods_to_avoid: ['Cold drinks'], warning_signs: ['High fever'], follow_up: 'Monitor' },
        subacute_4_7_days: { medications: [], home_care: ['Steam'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Wait' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'See doctor' }
      }
    },
    {
      id: '2', name: 'Influenza (Flu)', category: 'Respiratory', severity: 'moderate',
      description: 'Acute viral infection of the respiratory system.',
      typicalDuration: '1-2 weeks',
      symptoms: [{name:'fever', frequency:'very common'}, {name:'body aches', frequency:'common'}, {name:'fatigue', frequency:'very common'}],
      diagnosticQuestions: ['Do you have body aches?', 'Is your fever high?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Tamiflu', dosage_adult: '75mg', dosage_pediatric: '30mg', frequency: '12h', purpose: 'Antiviral'}], home_care: ['Bed rest'], foods_to_eat: ['Broth'], foods_to_avoid: ['Caffeine'], warning_signs: ['Shortness of breath'], follow_up: 'Monitor oxygen' },
        subacute_4_7_days: { medications: [], home_care: ['Hydration'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Rest' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Professional consult' }
      }
    },
    {
      id: '3', name: 'Gastroenteritis', category: 'Gastrointestinal', severity: 'moderate',
      description: 'Inflammation of the stomach and intestines, usually caused by a virus or bacteria.',
      typicalDuration: '3-7 days',
      symptoms: [{name:'nausea', frequency:'very common'}, {name:'vomiting', frequency:'common'}, {name:'diarrhea', frequency:'very common'}],
      diagnosticQuestions: ['How many times have you vomited?', 'Do you have stomach cramps?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'ORS', dosage_adult: '2L', dosage_pediatric: '1L', frequency: 'Daily', purpose: 'Rehydration'}], home_care: ['Sips of water'], foods_to_eat: ['Rice', 'Bananas'], foods_to_avoid: ['Spicy food', 'Dairy'], warning_signs: ['Dehydration'], follow_up: 'Monitor output' },
        subacute_4_7_days: { medications: [], home_care: ['Bland diet'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Resume diet' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Blood tests' }
      }
    },
    {
      id: '4', name: 'Migraine', category: 'Neurological', severity: 'moderate',
      description: 'A neurological condition that can cause multiple symptoms, most notably a throbbing headache.',
      typicalDuration: '4-72 hours',
      symptoms: [{name:'headache', frequency:'very common'}, {name:'nausea', frequency:'common'}, {name:'sensitivity to light', frequency:'very common'}],
      diagnosticQuestions: ['Is the pain on one side?', 'Are you sensitive to light?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Sumatriptan', dosage_adult: '50mg', dosage_pediatric: 'N/A', frequency: 'Once', purpose: 'Pain'}], home_care: ['Dark room'], foods_to_eat: ['Ginger tea'], foods_to_avoid: ['Chocolate', 'Cheese'], warning_signs: ['Visual loss'], follow_up: 'Sleep' },
        subacute_4_7_days: { medications: [], home_care: ['Stress management'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Tracker' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Neurologist' }
      }
    },
    {
      id: '5', name: 'Migraine (Severe)', category: 'Neurological', severity: 'severe',
      description: 'Intense migraine with debilitating symptoms.',
      typicalDuration: '3-5 days',
      symptoms: [{name:'headache', frequency:'very common'}, {name:'vomiting', frequency:'common'}, {name:'vision loss', frequency:'rare'}],
      diagnosticQuestions: ['Is this the worst headache of your life?', 'Can you move your arms normally?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'IV Fluids', dosage_adult: '1L', dosage_pediatric: '500ml', frequency: 'Once', purpose: 'Hydration'}], home_care: ['Hospital monitor'], foods_to_eat: [], foods_to_avoid: [], warning_signs: ['Confusion'], follow_up: 'ER visit' },
        subacute_4_7_days: { medications: [], home_care: ['Rest'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'MRI' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Chronic management' }
      }
    }
  ];

  const categories = ['Respiratory', 'Gastrointestinal', 'Neurological', 'Cardiovascular', 'Dermatological', 'Musculoskeletal', 'Psychological'];
  const severities: ('mild' | 'moderate' | 'severe')[] = ['mild', 'moderate', 'severe'];
  
  const additional: Disease[] = [];
  for(let i = 6; i <= 100; i++) {
    const cat = categories[i % categories.length];
    const sev = severities[i % severities.length];
    additional.push({
      id: i.toString(),
      name: `${cat} Condition Type ${i}`,
      category: cat,
      severity: sev,
      description: `Description for ${cat} clinical case number ${i}. This is a detailed medical context for training AI.`,
      typicalDuration: `${(i % 14) + 1} days`,
      symptoms: [{name: cat.toLowerCase(), frequency: 'common'}, {name: 'pain', frequency: 'very common'}],
      diagnosticQuestions: [`Question about ${cat} status?`, 'When did it start?'],
      isActive: true,
      treatmentProtocols: base[0].treatmentProtocols
    });
  }

  return [...base, ...additional];
};

const INITIAL_DISEASES = generateMedicalDB();

class DBService {
  private users: User[] = [];
  private consultations: Consultation[] = [];
  private messages: Message[] = [];
  private diseases: Disease[] = [];
  private initialized = false;

  async init() {
    if (this.initialized) return;
    
    const storedDiseases = localStorage.getItem('diseases');
    if (storedDiseases) {
      this.diseases = JSON.parse(storedDiseases);
    } else {
      this.diseases = INITIAL_DISEASES;
      localStorage.setItem('diseases', JSON.stringify(this.diseases));
    }

    this.initialized = true;
  }

  private async fetchFromSupabase() {
    try {
      const { data: consultationsData } = await supabase.from('consultations').select('*');
      if (consultationsData) {
        this.consultations = consultationsData.map((c: any) => ({
          id: c.id,
          userId: c.user_id,
          timestamp: c.created_at,
          chiefComplaint: c.chief_complaint || '',
          diagnosis: c.diagnosis || '',
          confidenceLevel: c.confidence_level || 'Medium',
          status: c.status || 'active',
          emergencyFlag: c.emergency_flag || false,
          symptoms: c.symptoms_snapshot || []
        }));
      }

      const { data: messagesData } = await supabase.from('messages').select('*');
      if (messagesData) {
        this.messages = messagesData.map((m: any) => ({
          id: m.id,
          consultationId: m.consultation_id,
          type: m.sender_type,
          content: m.content,
          timestamp: m.timestamp
        }));
      }

      const { data: usersData } = await supabase.from('profiles').select('*');
      if (usersData) {
        this.users = usersData.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: '',
          createdAt: u.created_at
        }));
      }

      const { data: diseasesData } = await supabase.from('diseases').select('*').eq('is_active', true);
      if (diseasesData && diseasesData.length > 0) {
        this.diseases = diseasesData.map((d: any) => ({
          id: d.id,
          name: d.name,
          category: d.category,
          severity: d.severity,
          description: d.description,
          typicalDuration: d.typical_duration,
          symptoms: d.symptoms_json || [],
          diagnosticQuestions: d.diagnostic_questions || [],
          isActive: d.is_active,
          treatmentProtocols: d.treatment_protocols_json || {}
        }));
      }
    } catch (e) {
      console.log('Using local fallback:', e);
    }
  }

  getUsers() { return this.users; }
  getUser(id: string) { return this.users.find(u => u.id === id); }
  
  getUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  async addUser(user: Omit<User, 'id' | 'createdAt'>) {
    const newUser = { 
      ...user, 
      id: crypto.randomUUID(), 
      createdAt: new Date().toISOString() 
    } as User;
    this.users.push(newUser);
    
    try {
      await supabase.from('profiles').insert({
        id: newUser.id,
        name: user.name,
        role: 'patient'
      });
    } catch (e) {
      console.log('Local fallback for user creation');
    }
    
    localStorage.setItem('users', JSON.stringify(this.users));
    return newUser;
  }

  getCurrentUser(): User | null {
    const userId = localStorage.getItem('currentUserId');
    return userId ? this.getUser(userId) || null : null;
  }

  setCurrentUser(userId: string | null) {
    if (userId) localStorage.setItem('currentUserId', userId);
    else localStorage.removeItem('currentUserId');
  }

  getConsultations() { return this.consultations; }
  getConsultationsByUser(userId: string) {
    return this.consultations.filter(c => c.userId === userId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
  getConsultation(id: string) { return this.consultations.find(c => c.id === id); }

  async startConsultation(userId: string) {
    const consultation: Consultation = {
      id: crypto.randomUUID(),
      userId,
      timestamp: new Date().toISOString(),
      chiefComplaint: '',
      status: 'active',
      emergencyFlag: false,
      symptoms: []
    };
    this.consultations.push(consultation);
    
    try {
      await supabase.from('consultations').insert({
        id: consultation.id,
        user_id: userId,
        chief_complaint: '',
        status: 'active',
        emergency_flag: false,
        symptoms_snapshot: []
      });
    } catch (e) {
      console.log('Local fallback for consultation');
    }
    
    localStorage.setItem('consultations', JSON.stringify(this.consultations));
    return consultation;
  }

  async updateConsultation(id: string, updates: Partial<Consultation>) {
    const index = this.consultations.findIndex(c => c.id === id);
    if (index !== -1) {
      this.consultations[index] = { ...this.consultations[index], ...updates };
      
      try {
        await supabase.from('consultations').update({
          chief_complaint: updates.chiefComplaint,
          diagnosis: updates.diagnosis,
          confidence_level: updates.confidenceLevel,
          status: updates.status,
          emergency_flag: updates.emergencyFlag,
          symptoms_snapshot: updates.symptoms,
          completed_at: updates.status === 'completed' ? new Date().toISOString() : null
        }).eq('id', id);
      } catch (e) {
        console.log('Local fallback for update');
      }
      
      localStorage.setItem('consultations', JSON.stringify(this.consultations));
    }
  }

  getMessages(consultationId: string) {
    return this.messages.filter(m => m.consultationId === consultationId);
  }

  async addMessage(consultationId: string, type: 'bot' | 'user', content: string) {
    const message: Message = {
      id: crypto.randomUUID(),
      consultationId,
      type,
      content,
      timestamp: new Date().toISOString()
    };
    this.messages.push(message);
    
    try {
      await supabase.from('messages').insert({
        id: message.id,
        consultation_id: consultationId,
        sender_type: type,
        content: content,
        timestamp: message.timestamp
      });
    } catch (e) {
      console.log('Local fallback for message');
    }
    
    localStorage.setItem('messages', JSON.stringify(this.messages));
    return message;
  }

  getDiseases() { return this.diseases; }
  addDisease(disease: Omit<Disease, 'id'>) {
    const newDisease = { ...disease, id: crypto.randomUUID() };
    this.diseases.push(newDisease);
    localStorage.setItem('diseases', JSON.stringify(this.diseases));
    return newDisease;
  }
}

export const db = new DBService();