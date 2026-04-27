
import { User, Consultation, Message, Disease } from '../types';

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

  // Logic to generate more diverse cases up to ~100
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
      treatmentProtocols: base[0].treatmentProtocols // Reusing template for brevity in generation
    });
  }

  return [...base, ...additional];
};

const INITIAL_DISEASES = generateMedicalDB();

class DBService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private consultations: Consultation[] = JSON.parse(localStorage.getItem('consultations') || '[]');
  private messages: Message[] = JSON.parse(localStorage.getItem('messages') || '[]');
  private diseases: Disease[] = JSON.parse(localStorage.getItem('diseases') || JSON.stringify(INITIAL_DISEASES));

  private save() {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('consultations', JSON.stringify(this.consultations));
    localStorage.setItem('messages', JSON.stringify(this.messages));
    localStorage.setItem('diseases', JSON.stringify(this.diseases));
  }

  getUsers() { return this.users; }
  getUser(id: string) { return this.users.find(u => u.id === id); }
  
  getUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>) {
    const newUser = { 
      ...user, 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString() 
    } as User;
    this.users.push(newUser);
    this.save();
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
  startConsultation(userId: string) {
    const consultation: Consultation = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      timestamp: new Date().toISOString(),
      chiefComplaint: '',
      status: 'active',
      emergencyFlag: false,
      symptoms: []
    };
    this.consultations.push(consultation);
    this.save();
    return consultation;
  }

  updateConsultation(id: string, updates: Partial<Consultation>) {
    const index = this.consultations.findIndex(c => c.id === id);
    if (index !== -1) {
      this.consultations[index] = { ...this.consultations[index], ...updates };
      this.save();
    }
  }

  getMessages(consultationId: string) {
    return this.messages.filter(m => m.consultationId === consultationId);
  }

  addMessage(consultationId: string, type: 'bot' | 'user', content: string) {
    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      consultationId,
      type,
      content,
      timestamp: new Date().toISOString()
    };
    this.messages.push(message);
    this.save();
    return message;
  }

  getDiseases() { return this.diseases; }
  addDisease(disease: Omit<Disease, 'id'>) {
    const newDisease = { ...disease, id: Math.random().toString(36).substr(2, 9) };
    this.diseases.push(newDisease);
    this.save();
    return newDisease;
  }
}

export const db = new DBService();
