import { User, Consultation, Message, Disease } from '../types';

const generateMedicalDB = (): Disease[] => {
  const commonDiseases: Disease[] = [
    {
      id: 'cold', name: 'Common Cold', category: 'Respiratory', severity: 'mild',
      description: 'Caused by rhinoviruses, affecting the respiratory passages.',
      typicalDuration: '7-10 days',
      symptoms: [{name:'runny nose', frequency:'very common'}, {name:'sore throat', frequency:'common'}, {name:'sneezing', frequency:'very common'}],
      diagnosticQuestions: ['Do you have a runny nose?', 'Is your throat sore?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Acetaminophen', dosage_adult: '500mg', dosage_pediatric: '250mg', frequency: '6h', purpose: 'Fever/Ache'}], home_care: ['Rest', 'Warm salt water gargle'], foods_to_eat: ['Chicken soup', 'Ginger tea'], foods_to_avoid: ['Cold dairy', 'Sugary drinks'], warning_signs: ['High fever > 102F'], follow_up: 'Monitor symptoms' },
        subacute_4_7_days: { medications: [{name: 'Vitamin C', dosage_adult: '1000mg', dosage_pediatric: '500mg', frequency: 'Daily', purpose: 'Immune support'}], home_care: ['Steam inhalation'], foods_to_eat: ['Citrus fruits'], foods_to_avoid: [], warning_signs: [], follow_up: 'Wait for recovery' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: ['Shortness of breath'], follow_up: 'See a doctor if symptoms persist' }
      }
    },
    {
      id: 'flu', name: 'Influenza (Flu)', category: 'Respiratory', severity: 'moderate',
      description: 'An acute respiratory illness caused by influenza viruses.',
      typicalDuration: '1-2 weeks',
      symptoms: [{name:'fever', frequency:'very common'}, {name:'body aches', frequency:'very common'}, {name:'fatigue', frequency:'very common'}, {name:'chills', frequency:'common'}],
      diagnosticQuestions: ['Do you have severe muscle aches?', 'Is your temperature above 100.4F?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Oseltamivir', dosage_adult: '75mg', dosage_pediatric: '30mg', frequency: '12h', purpose: 'Antiviral'}], home_care: ['Strict bed rest', 'Hydration'], foods_to_eat: ['Light broth', 'Electrolytes'], foods_to_avoid: ['Alcohol', 'Caffeine'], warning_signs: ['Chest pain', 'Confusion'], follow_up: 'Urgent care if breathing gets hard' },
        subacute_4_7_days: { medications: [{name: 'Ibuprofen', dosage_adult: '400mg', dosage_pediatric: '200mg', frequency: '8h', purpose: 'Aches'}], home_care: ['Gradual return to activity'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Fever check' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: ['Productive cough with blood'], follow_up: 'Post-viral checkup' }
      }
    },
    {
      id: 'tb', name: 'Tuberculosis (TB)', category: 'Infectious', severity: 'severe',
      description: 'A bacterial infection primarily affecting the lungs, caused by Mycobacterium tuberculosis.',
      typicalDuration: '6-9 months',
      symptoms: [{name:'cough', frequency:'very common'}, {name:'weight loss', frequency:'common'}, {name:'night sweats', frequency:'common'}, {name:'chest pain', frequency:'common'}],
      diagnosticQuestions: ['Have you been coughing for more than 3 weeks?', 'Are you coughing up blood?', 'Do you have night sweats?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Isoniazid', dosage_adult: '300mg', dosage_pediatric: '10mg/kg', frequency: 'Daily', purpose: 'Antitubercular'}], home_care: ['Isolation', 'High protein diet'], foods_to_eat: ['Eggs', 'Milk', 'Lentils'], foods_to_avoid: ['Alcohol', 'Smoking'], warning_signs: ['Hemoptysis (coughing blood)'], follow_up: 'Hospitalization may be required' },
        subacute_4_7_days: { medications: [{name: 'Rifampin', dosage_adult: '600mg', dosage_pediatric: '15mg/kg', frequency: 'Daily', purpose: 'Antibiotic'}], home_care: ['Strict adherence to meds'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Sputum test' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Long-term DOTS therapy' }
      }
    },
    {
      id: 'malaria', name: 'Malaria', category: 'Infectious', severity: 'severe',
      description: 'A parasitic disease transmitted by mosquitoes causing periodic fevers.',
      typicalDuration: '2-4 weeks',
      symptoms: [{name:'fever', frequency:'very common'}, {name:'chills', frequency:'very common'}, {name:'sweating', frequency:'common'}, {name:'headache', frequency:'common'}],
      diagnosticQuestions: ['Does your fever come in cycles?', 'Have you visited a mosquito-prone area recently?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Artemether/Lumefantrine', dosage_adult: '80/480mg', dosage_pediatric: 'Weight based', frequency: '12h', purpose: 'Antimalarial'}], home_care: ['Fever monitoring'], foods_to_eat: ['Light meals', 'Coconut water'], foods_to_avoid: ['Fatty foods'], warning_signs: ['Jaundice', 'Seizures'], follow_up: 'Immediate medical review' },
        subacute_4_7_days: { medications: [{name: 'Paracetamol', dosage_adult: '500mg', dosage_pediatric: '250mg', frequency: '6h', purpose: 'Fever'}], home_care: ['Rest'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Repeat blood smear' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Recovery monitoring' }
      }
    },
    {
      id: 'diabetes', name: 'Diabetes Mellitus', category: 'Chronic', severity: 'moderate',
      description: 'A metabolic disorder characterized by high blood sugar levels.',
      typicalDuration: 'Lifelong',
      symptoms: [{name:'thirst', frequency:'very common'}, {name:'frequent urination', frequency:'very common'}, {name:'fatigue', frequency:'common'}],
      diagnosticQuestions: ['Are you unusually thirsty?', 'Are you urinating more than usual?', 'Is your vision blurry?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Metformin', dosage_adult: '500mg', dosage_pediatric: 'N/A', frequency: 'Daily', purpose: 'Blood sugar control'}], home_care: ['Glucose monitoring'], foods_to_eat: ['Leafy greens', 'Whole grains'], foods_to_avoid: ['Refined sugar', 'Soda'], warning_signs: ['Extreme thirst', 'Fruity breath'], follow_up: 'Endocrinologist consult' },
        subacute_4_7_days: { medications: [], home_care: ['Daily exercise'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'HbA1c test' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Regular foot and eye exams' }
      }
    },
    {
      id: 'hypertension', name: 'Hypertension', category: 'Chronic', severity: 'moderate',
      description: 'A condition where blood pressure in the arteries is persistently high.',
      typicalDuration: 'Lifelong',
      symptoms: [{name:'headache', frequency:'common'}, {name:'dizziness', frequency:'common'}, {name:'nosebleeds', frequency:'rare'}],
      diagnosticQuestions: ['Have you checked your BP recently?', 'Do you have frequent headaches?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Amlodipine', dosage_adult: '5mg', dosage_pediatric: 'N/A', frequency: 'Daily', purpose: 'Lower BP'}], home_care: ['Salt restriction'], foods_to_eat: ['Bananas', 'Berries'], foods_to_avoid: ['Processed meat', 'Canned soup'], warning_signs: ['Severe headache', 'Chest pain'], follow_up: 'Daily BP log' },
        subacute_4_7_days: { medications: [], home_care: ['Stress reduction'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Physician review' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Long-term cardiac screening' }
      }
    },
    {
      id: 'typhoid', name: 'Typhoid Fever', category: 'Infectious', severity: 'severe',
      description: 'Bacterial infection spread through contaminated food/water.',
      typicalDuration: '2-4 weeks',
      symptoms: [{name:'fever', frequency:'very common'}, {name:'abdominal pain', frequency:'common'}, {name:'weakness', frequency:'very common'}],
      diagnosticQuestions: ['Did the fever start slowly and increase?', 'Do you have stomach pain?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Ciprofloxacin', dosage_adult: '500mg', dosage_pediatric: '15mg/kg', frequency: '12h', purpose: 'Antibiotic'}], home_care: ['Boiled water only', 'Bed rest'], foods_to_eat: ['Porridge', 'Boiled eggs'], foods_to_avoid: ['Raw vegetables', 'Street food'], warning_signs: ['Severe abdominal pain'], follow_up: 'Blood culture' },
        subacute_4_7_days: { medications: [], home_care: ['Hydration'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Fever clearance' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Stool test for carrier status' }
      }
    },
    {
      id: 'dengue', name: 'Dengue Fever', category: 'Infectious', severity: 'severe',
      description: 'Mosquito-borne viral infection causing severe joint and muscle pain.',
      typicalDuration: '1-2 weeks',
      symptoms: [{name:'pain', frequency:'very common'}, {name:'fever', frequency:'very common'}, {name:'rash', frequency:'common'}],
      diagnosticQuestions: ['Do you have pain behind your eyes?', 'Do you have severe bone/joint pain?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Paracetamol', dosage_adult: '650mg', dosage_pediatric: '15mg/kg', frequency: '6h', purpose: 'Pain/Fever'}], home_care: ['Hydration', 'Mosquito nets'], foods_to_eat: ['Papaya leaf extract', 'Juice'], foods_to_avoid: ['Aspirin', 'Ibuprofen'], warning_signs: ['Bleeding gums', 'Persistent vomiting'], follow_up: 'Platelet count monitoring' },
        subacute_4_7_days: { medications: [], home_care: ['Complete rest'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Blood test' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Recovery' }
      }
    },
    {
      id: 'cholera', name: 'Cholera', category: 'Infectious', severity: 'severe',
      description: 'Bacterial infection of the intestine causing severe watery diarrhea.',
      typicalDuration: '1-5 days',
      symptoms: [{name:'diarrhea', frequency:'very common'}, {name:'vomiting', frequency:'common'}, {name:'dehydration', frequency:'very common'}],
      diagnosticQuestions: ['Is the diarrhea like rice-water?', 'Are you extremely thirsty?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'ORS', dosage_adult: 'Ad libitum', dosage_pediatric: 'Frequent sips', frequency: 'Continuous', purpose: 'Rehydration'}], home_care: ['Immediate rehydration'], foods_to_eat: ['Soft rice'], foods_to_avoid: ['Solid foods'], warning_signs: ['Sunken eyes', 'No urination'], follow_up: 'Stool monitoring' },
        subacute_4_7_days: { medications: [{name: 'Doxycycline', dosage_adult: '300mg', dosage_pediatric: 'N/A', frequency: 'Once', purpose: 'Antibiotic'}], home_care: ['Sanitization'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Clinic review' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Hygiene education' }
      }
    },
    {
      id: 'asthma', name: 'Asthma', category: 'Chronic', severity: 'moderate',
      description: 'Chronic condition causing airway inflammation and breathing difficulties.',
      typicalDuration: 'Lifelong',
      symptoms: [{name:'shortness of breath', frequency:'very common'}, {name:'wheezing', frequency:'very common'}, {name:'cough', frequency:'common'}],
      diagnosticQuestions: ['Do you wheeze when you breathe?', 'Is it worse at night?', 'Do you have tight chest?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Salbutamol Inhaler', dosage_adult: '2 puffs', dosage_pediatric: '1-2 puffs', frequency: 'As needed', purpose: 'Reliever'}], home_care: ['Trigger avoidance'], foods_to_eat: ['Anti-inflammatory foods'], foods_to_avoid: ['Sulfites', 'Cold food'], warning_signs: ['Inhaler not working', 'Unable to speak'], follow_up: 'Pulmonologist review' },
        subacute_4_7_days: { medications: [{name: 'Fluticasone', dosage_adult: '100mcg', dosage_pediatric: '50mcg', frequency: 'Daily', purpose: 'Controller'}], home_care: ['Peak flow monitoring'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Action plan review' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Regular spirometry' }
      }
    },
    {
      id: 'migraine', name: 'Migraine', category: 'Neurological', severity: 'moderate',
      description: 'A neurological condition causing severe headaches and sensory disturbances.',
      typicalDuration: '4-72 hours',
      symptoms: [{name:'headache', frequency:'very common'}, {name:'nausea', frequency:'common'}, {name:'sensitivity to light', frequency:'very common'}],
      diagnosticQuestions: ['Is the pain on one side of your head?', 'Do you see flashing lights?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Sumatriptan', dosage_adult: '50mg', dosage_pediatric: 'N/A', frequency: 'Once', purpose: 'Pain relief'}], home_care: ['Dark room', 'Rest'], foods_to_eat: ['Ginger tea'], foods_to_avoid: ['Chocolate', 'Cheese', 'Caffeine'], warning_signs: ['Visual disturbances', 'Speech problems'], follow_up: 'Sleep in dark room' },
        subacute_4_7_days: { medications: [], home_care: ['Stress management'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Headache diary' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Neurologist consult' }
      }
    },
    {
      id: 'gastro', name: 'Gastroenteritis', category: 'Gastrointestinal', severity: 'moderate',
      description: 'Inflammation of the stomach and intestines, usually caused by viruses.',
      typicalDuration: '3-7 days',
      symptoms: [{name:'nausea', frequency:'very common'}, {name:'vomiting', frequency:'common'}, {name:'diarrhea', frequency:'very common'}],
      diagnosticQuestions: ['How many times have you vomited?', 'Is there blood in stool?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'ORS', dosage_adult: '2L', dosage_pediatric: '1L', frequency: 'Daily', purpose: 'Rehydration'}], home_care: ['Sips of water', 'BRAT diet'], foods_to_eat: ['Rice', 'Bananas', 'Toast'], foods_to_avoid: ['Dairy', 'Spicy food', 'Fatty foods'], warning_signs: ['Blood in stool', 'Severe dehydration'], follow_up: 'Monitor hydration' },
        subacute_4_7_days: { medications: [], home_care: ['Bland diet'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Resume normal diet' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Stool test if persistent' }
      }
    },
    {
      id: 'pneumonia', name: 'Pneumonia', category: 'Respiratory', severity: 'severe',
      description: 'Infection that inflames the air sacs in one or both lungs.',
      typicalDuration: '1-3 weeks',
      symptoms: [{name:'cough', frequency:'very common'}, {name:'fever', frequency:'very common'}, {name:'chest pain', frequency:'common'}, {name:'shortness of breath', frequency:'common'}],
      diagnosticQuestions: ['Are you coughing up colored mucus?', 'Is it painful to breathe?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Amoxicillin', dosage_adult: '500mg', dosage_pediatric: '250mg', frequency: '8h', purpose: 'Antibiotic'}], home_care: ['Rest', 'Hydration'], foods_to_eat: ['Light meals', 'Warm fluids'], foods_to_avoid: ['Smoking', 'Cold air'], warning_signs: ['Blue lips', 'Confusion'], follow_up: 'Chest X-ray' },
        subacute_4_7_days: { medications: [], home_care: ['Deep breathing exercises'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Follow-up scan' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Pulmonary rehab if needed' }
      }
    },
    {
      id: 'uti', name: 'Urinary Tract Infection', category: 'Infectious', severity: 'mild',
      description: 'Bacterial infection in any part of the urinary system.',
      typicalDuration: '3-7 days',
      symptoms: [{name:'painful urination', frequency:'very common'}, {name:'frequent urination', frequency:'very common'}, {name:'blood in urine', frequency:'common'}],
      diagnosticQuestions: ['Do you feel burning when urinating?', 'Is there blood in urine?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Nitrofurantoin', dosage_adult: '100mg', dosage_pediatric: 'N/A', frequency: '6h', purpose: 'Antibiotic'}], home_care: ['Plenty of water', 'Avoid caffeine'], foods_to_eat: ['Cranberry juice'], foods_to_avoid: ['Coffee', 'Alcohol'], warning_signs: ['Fever', 'Back pain'], follow_up: 'Urine test' },
        subacute_4_7_days: { medications: [], home_care: ['Urinate frequently'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Repeat culture' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Urologist if recurrent' }
      }
    },
    {
      id: 'arthritis', name: 'Arthritis', category: 'Musculoskeletal', severity: 'moderate',
      description: 'Inflammation of one or more joints causing pain and stiffness.',
      typicalDuration: 'Lifelong',
      symptoms: [{name:'joint pain', frequency:'very common'}, {name:'stiffness', frequency:'very common'}, {name:'swelling', frequency:'common'}],
      diagnosticQuestions: ['Are your joints stiff in the morning?', 'Is the pain worse with movement?'],
      isActive: true,
      treatmentProtocols: {
        acute_1_3_days: { medications: [{name: 'Ibuprofen', dosage_adult: '400mg', dosage_pediatric: '200mg', frequency: '8h', purpose: 'Pain/Inflamation'}], home_care: ['Rest', 'Hot/cold therapy'], foods_to_eat: ['Omega-3 rich foods', 'Leafy greens'], foods_to_avoid: ['Processed foods', 'Red meat'], warning_signs: ['Joint deformity'], follow_up: 'Rheumatologist review' },
        subacute_4_7_days: { medications: [], home_care: ['Gentle exercise'], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Physical therapy' },
        chronic_8_plus_days: { medications: [], home_care: [], foods_to_eat: [], foods_to_avoid: [], warning_signs: [], follow_up: 'Regular monitoring' }
      }
    }
  ];

  const requestedInfectious = [
    'Chickenpox', 'Measles', 'Mumps', 'Rubella', 'Polio', 'Diphtheria', 'Whooping Cough', 'Tetanus', 
    'Zika Virus', 'Ebola', 'HIV/AIDS', 'Hepatitis', 'Meningitis', 'Shingles', 'Norovirus', 'Rotavirus', 
    'Gonorrhea', 'Syphilis', 'Chlamydia', 'HPV', 'Rabies', 'Lyme Disease', 'Meningococcal Disease'
  ];
  const requestedChronic = [
    'Cardiovascular Disease', 'Stroke', 'Coronary Heart Disease', 'Cancer', 'Alzheimer’s Disease', 
    'Parkinson’s Disease', 'Rheumatoid Arthritis', 'Osteoarthritis', 'COPD', 'Chronic Kidney Disease', 
    'Liver Cirrhosis', 'Anemia', 'Depression', 'Anxiety Disorders', 'Epilepsy', 'Psoriasis', 'Eczema'
  ];

  const categories = ['Infectious', 'Chronic', 'Neurological', 'Cardiovascular', 'Psychological', 'Dermatological'];
  
  const additional: Disease[] = [];
  
  [...requestedInfectious, ...requestedChronic].forEach((name, i) => {
    const isInf = requestedInfectious.includes(name);
    additional.push({
      id: `ext-${i}`,
      name: name,
      category: isInf ? 'Infectious' : 'Chronic',
      severity: isInf ? 'severe' : 'moderate',
      description: `${name}: A significant condition affecting public health as requested.`,
      typicalDuration: isInf ? '2-4 weeks' : 'Indefinite',
      symptoms: [{name: name.toLowerCase(), frequency: 'very common'}, {name: 'fatigue', frequency: 'common'}],
      diagnosticQuestions: [`Are you experiencing specific symptoms of ${name}?`, 'When did you first notice this?'],
      isActive: true,
      treatmentProtocols: commonDiseases[0].treatmentProtocols
    });
  });

  for(let i = additional.length + commonDiseases.length; i < 100; i++) {
    const cat = categories[i % categories.length];
    additional.push({
      id: `gen-${i}`,
      name: `${cat} Variant ${i}`,
      category: cat,
      severity: 'moderate',
      description: `Generic ${cat} condition profile for database expansion.`,
      typicalDuration: '14 days',
      symptoms: [{name: 'pain', frequency: 'common'}],
      diagnosticQuestions: ['Is the pain persistent?'],
      isActive: true,
      treatmentProtocols: commonDiseases[0].treatmentProtocols
    });
  }

  return [...commonDiseases, ...additional];
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