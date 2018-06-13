import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
@Injectable()
export class SharedData {

  quizQuestions = [
    {
      id: 1,
      text: 'When did Endava opened Development Center in Iasi?',
      answers: [ {id: 'first', answer: '2000', isCorrect: 0},
        {id: 'second', answer: '2007', isCorrect: 1},
        {id: 'third', answer: '2013', isCorrect: 0},
        {id: 'fourth', answer: '2015', isCorrect: 0}]
    }, {
      id: 2,
      text: 'What are the core purposes & values?',
      answers: [ {id: 'first', answer: 'Open, Thoughtful, Adaptable, Smart, Trusted', isCorrect: 1},
        {id: 'second', answer: 'Loyal, Honest, Patriot, Educated, Respectful', isCorrect: 0},
        {id: 'third', answer: 'Independant, Innovative, Adventurous, Efficient', isCorrect: 0},
        {id: 'fourth', answer: 'Creative, Consistent, Dependant, Honest, Commited', isCorrect: 0}]
    }, {
      id: 3,
      text: 'What is endava culture about?',
      answers: [ {id: 'first', answer: 'Culture of Entitlement and Mistrust', isCorrect: 0},
        {id: 'second', answer: 'Culture of Fear and Manipulation', isCorrect: 0},
        {id: 'third', answer: 'Culture of Empowerment and Opportunity', isCorrect: 1},
        {id: 'fourth', answer: 'Culture of Apathy and Low Expectation', isCorrect: 0}]
    }
  ];

  pois = [{
    'image': './assets/img/poi/Citea_Alexandra.jpg',
    'name': 'Alexandra Citea',
    'description': 'Junior Tester'
  }, {
      'image': './assets/img/poi/Clatinici_Eduard.jpg',
      'name': 'Eduard Clatinici',
      'description': 'Junior Developer'
    }, {
      'image': './assets/img/poi/Craus_Alexandru.jpg',
      'name': 'Alexandru Craus',
      'description': 'Junior Tester'
    }, {
      'image': './assets/img/poi/Fusa_Bogdan.jpg',
      'name': 'Bogdan Fusa',
      'description': 'Junior AM Engineer'
    }, {
      'image': './assets/img/poi/Leonte_Maria.jpg',
      'name': 'Maria Leonte',
      'description': 'Junior Developer'
    }, {
      'image': './assets/img/poi/Luncasu_Bogdan.jpg',
      'name': 'Bogdan Luncasu',
      'description': 'Junior Developer'
    }
    ];

  countries = [
    {id: 1, name: 'Romania'},
    {id: 2, name: 'Bulgaria'},
    {id: 3, name: 'Serbia'},
    {id: 4, name: 'Republic of Moldova'},
    {id: 5, name: 'Republic of Macedonia'},
    {id: 6, name: 'Columbia'}
  ];
  allCities = [
    {
      countryName: 'Romania',
      cities: [
        {id: 1, name: 'Iasi', office: 'UBC Palas', businessUnit: 'ISD', floors: [1, 4, 5]},
        {id: 2, name: 'Cluj', office: 'OfficeCluj', businessUnit: 'CLD', floors: [2, 4]},
        {id: 3, name: 'Bucharest', office: 'OfficeBucharest', businessUnit: 'BHD', floors: [2, 4]}
      ]
    }, {
      countryName: 'Serbia',
      cities: [
        {id: 1, name: 'Belgrade', office: 'OfficeBelgrade', businessUnit: 'BGD', floors: [2, 4]}
      ]
    }, {
      countryName: 'Columbia',
      cities: [
        {id: 1, name: 'Bogota', office: 'OfficeBogota', businessUnit: 'BOD', floors: [2, 4]}
      ]
    }, {
      countryName: 'Republic of Moldova',
      cities: [
        {id: 1, name: 'Chisinau', office: 'OfficeChisinau', businessUnit: 'MDD', floors: [2, 4]}
      ]
    }, {
      countryName: 'Republic of Macedonia',
      cities: [
        {id: 1, name: 'Skopje', office: 'OfficeSkopje', businessUnit: 'SKD', floors: [2, 4]}
      ]
    }, {
      countryName: 'Bulgaria',
      cities: [
        {id: 1, name: 'Sofia', office: 'OfficeSofia', businessUnit: 'SFD', floors: [2, 4]}
      ]
    }
  ];

  allJobTitles = [
    {
      disciplineName: 'Analyst',
      jobTitles: [
        {id: 1, name: 'Analyst Consultant'},
        {id: 2, name: 'Quality and Security Consultant'},
        {id: 3, name: 'Discipline Lead'},
        {id: 4, name: 'Senior Business Analyst'},
        {id: 5, name: 'Senior UX Developer'},
        {id: 6, name: 'UX Developer'},
        {id: 7, name: 'BI Analyst Developer'},
        {id: 8, name: 'Business Analyst'},
        {id: 9, name: 'Head of Analysis Iasi'},
        {id: 10, name: 'BI Application Consultant'},
        {id: 11, name: 'Senior Analyst'}
      ]
    }, {
      disciplineName: 'Development',
      jobTitles: [
        {id: 1, name: 'Senior Development Consultant'},
        {id: 2, name: 'Design Lead'},
        {id: 3, name: 'Development Consultant'},
        {id: 4, name: 'Junior Developer'},
        {id: 5, name: 'Head of Development Iasi'},
        {id: 6, name: 'Development Lead'},
        {id: 7, name: 'Senior Developer'},
        {id: 8, name: 'Delivery Manager'},
        {id: 9, name: 'Discipline Lead'},
        {id: 10, name: 'Developer'}
      ]
    }, {
      disciplineName: 'Testing',
      jobTitles: [
        {id: 1, name: 'Senior Tester'},
        {id: 2, name: 'Junior Tester'},
        {id: 3, name: 'Senior Test Consultant'},
        {id: 4, name: 'Tester'},
        {id: 5, name: 'Head of Testing Iasi'},
        {id: 6, name: 'Test Lead'},
        {id: 7, name: 'Test Consultant'},
        {id: 8, name: 'Test Manager'},
        {id: 9, name: 'Discipline Lead'}
      ]
    }, {
      disciplineName: 'Applications Management',
      jobTitles: [
        {id: 1, name: 'AM Team Leader'},
        {id: 2, name: 'Senior AM Engineer'},
        {id: 3, name: 'AM Engineer'},
        {id: 4, name: 'Client Support Manager'},
        {id: 5, name: 'Service Delivery Manager'},
        {id: 6, name: 'Head of Applications Management'},
        {id: 7, name: 'Senior DevOp Engineer'},
        {id: 8, name: 'DevOps Engineer'},
        {id: 9, name: 'Junior AM Engineer'}
      ]
    }, {
      disciplineName: 'Architecture',
      jobTitles: [
        {id: 1, name: 'Senior Architect'},
        {id: 2, name: 'Architect/System Analyst'},
        {id: 3, name: 'Senior Design Lead'},
        {id: 4, name: 'Architect'},
        {id: 5, name: 'Design Lead'},
        {id: 6, name: 'Head of Architecture'}
      ]
    }, {
      disciplineName: 'Project Management',
      jobTitles: [
        {id: 1, name: 'Delivery Manager'},
        {id: 2, name: 'Project Manager'},
        {id: 3, name: 'Senior Project Manager'},
        {id: 4, name: 'Discipline Lead'},
        {id: 5, name: 'Project Leader'},
        {id: 6, name: 'Head of Project Management'},
        {id: 7, name: 'Junior Project Manager'},
        {id: 8, name: 'Delevery Partner'}
      ]
    }, {
      disciplineName: 'Managed Service',
      jobTitles: [
        {id: 1, name: 'Service Delivery Manager'},
        {id: 2, name: 'Senior Support Engineer'},
        {id: 3, name: 'Service Management Tools PHP Developer'},
        {id: 4, name: 'Application Support Senior Engineer'},
        {id: 5, name: 'Senior Systems Engineer'},
        {id: 6, name: 'Support Engineer'},
        {id: 7, name: 'Knowledge Manager'},
        {id: 8, name: 'IT Support & Monitoring Engineer'},
        {id: 9, name: 'Tools Manager'},
        {id: 10, name: 'Technical Group Leader'},
        {id: 11, name: 'Technology Group Support Manager'},
        {id: 12, name: 'MSD Operations Manager RO & MD'},
        {id: 13, name: 'Senior Network Engineer'},
        {id: 14, name: 'Service Team Leader'},
        {id: 15, name: 'Technical Systems Consultant'},
        {id: 16, name: 'Senior Systems Consultant'},
        {id: 17, name: 'IT Infrastructure Project Manager'},
        {id: 18, name: 'ITIL Service Transition Manager'},
        {id: 19, name: 'ITIL Process Consultant'},
        {id: 20, name: 'ITIL Process Consultant'},
        {id: 21, name: 'ITIL Process Analyst'},
        {id: 22, name: 'Senior IT Support Engineer'},
        {id: 23, name: 'Service Transition Manager'},
        {id: 24, name: 'Incident and Change Manager'},
        {id: 25, name: 'Project Support Officer'}
      ]
    }
  ];

  lineManagers = [
    {
      id: 1,
      name: 'Bogdan Buhaceanu',
      discipline: 'Analyst',
      office: 'UBC Palas',
      city: 'Iasi',
      country: 'Romania'
    }, {
      id: 2,
      name: 'Alexandru Moise',
      discipline: 'Applications Management',
      office: 'UBC Palas',
      city: 'Iasi',
      country: 'Romania'
    }, {
      id: 3,
      name: 'Adrian Miron',
      discipline: 'Architecture',
      office: 'UBC Palas',
      city: 'Iasi',
      country: 'Romania'
    }, {
      id: 4,
      name: 'Stefana Munteanu',
      discipline: 'Development',
      office: 'UBC Palas',
      city: 'Iasi',
      country: 'Romania'
    }, {
      id: 5,
      name: 'Bogdan Darabaneanu',
      discipline: 'Testing',
      office: 'UBC Palas',
      city: 'Iasi',
      country: 'Romania'
    }, {
      id: 6,
      name: 'Bogdan Buhaceanu',
      discipline: 'Project Management',
      office: 'UBC Palas',
      city: 'Iasi',
      country: 'Romania'
    }, {
      id: 7,
      name: 'Bogdan Clujeanu',
      discipline: 'Analyst',
      office: 'OfficeCluj',
      city: 'Cluj',
      country: 'Romania'
    }, {
      id: 8,
      name: 'Alexandru Clujeanu',
      discipline: 'Applications Management',
      office: 'OfficeCluj',
      city: 'Cluj',
      country: 'Romania'
    }, {
      id: 9,
      name: 'Adrian Clujeanu',
      discipline: 'Architecture',
      office: 'OfficeCluj',
      city: 'Cluj',
      country: 'Romania'
    }, {
      id: 10,
      name: 'Stefana Clujeanu',
      discipline: 'Development',
      office: 'OfficeCluj',
      city: 'Cluj',
      country: 'Romania'
    }, {
      id: 11,
      name: 'Bogdan Purcel',
      discipline: 'Testing',
      office: 'OfficeCluj',
      city: 'Cluj',
      country: 'Romania'
    }, {
      id: 12,
      name: 'Bogdan Rionisei',
      discipline: 'Project Management',
      office: 'OfficeCluj',
      city: 'Cluj',
      country: 'Romania'
    },
    {
      id: 13,
      name: 'Bogdan Bucuresteanu',
      discipline: 'Analyst',
      office: 'OfficeBucharest',
      city: 'Bucharest',
      country: 'Romania'
    }, {
      id: 14,
      name: 'Costel Balan',
      discipline: 'Applications Management',
      office: 'OfficeBucharest',
      city: 'Bucharest',
      country: 'Romania'
    }, {
      id: 15,
      name: 'Carmen Lopata',
      discipline: 'Architecture',
      office: 'OfficeBucharest',
      city: 'Bucharest',
      country: 'Romania'
    }, {
      id: 16,
      name: 'Mirel Codita',
      discipline: 'Development',
      office: 'OfficeBucharest',
      city: 'Bucharest',
      country: 'Romania'
    }, {
      id: 17,
      name: 'Pavel Bartos',
      discipline: 'Testing',
      office: 'OfficeBucharest',
      city: 'Bucharest',
      country: 'Romania'
    }, {
      id: 18,
      name: 'Anca Sef',
      discipline: 'Project Management',
      office: 'OfficeBucharest',
      city: 'Bucharest',
      country: 'Romania'
    }, {
      id: 19,
      name: 'Peggie Relifor',
      discipline: 'Analyst',
      office: 'OfficeChisinau',
      city: 'Chisinau',
      country: 'Republic of Moldova'
    }, {
      id: 20,
      name: 'Fletcher Wince',
      discipline: 'Applications Management',
      office: 'OfficeChisinau',
      city: 'Chisinau',
      country: 'Republic of Moldova'
    }, {
      id: 21,
      name: 'Marva Deramus',
      discipline: 'Architecture',
      office: 'OfficeChisinau',
      city: 'Chisinau',
      country: 'Republic of Moldova'
    }, {
      id: 22,
      name: 'Kermit Chennault',
      discipline: 'Development',
      office: 'OfficeChisinau',
      city: 'Chisinau',
      country: 'Republic of Moldova'
    }, {
      id: 23,
      name: 'Nicola Colman',
      discipline: 'Testing',
      office: 'OfficeChisinau',
      city: 'Chisinau',
      country: 'Republic of Moldova'
    }, {
      id: 24,
      name: 'Winter Okeeffe',
      discipline: 'Project Management',
      office: 'OfficeChisinau',
      city: 'Chisinau',
      country: 'Republic of Moldova'
    }, {
      id: 25,
      name: 'Emilia Blohm',
      discipline: 'Analyst',
      office: 'OfficeBelgrade',
      city: 'Belgrade',
      country: 'Serbia'
    }, {
      id: 26,
      name: 'Keturah Niles',
      discipline: 'Applications Management',
      office: 'OfficeBelgrade',
      city: 'Belgrade',
      country: 'Serbia'
    }, {
      id: 27,
      name: 'Phung Herzig',
      discipline: 'Architecture',
      office: 'OfficeBelgrade',
      city: 'Belgrade',
      country: 'Serbia'
    }, {
      id: 28,
      name: 'Aletha Drinnon',
      discipline: 'Development',
      office: 'OfficeBelgrade',
      city: 'Belgrade',
      country: 'Serbia'
    }, {
      id: 29,
      name: 'Toshiko Atkinson',
      discipline: 'Testing',
      office: 'OfficeBelgrade',
      city: 'Belgrade',
      country: 'Serbia'
    }, {
      id: 30,
      name: 'Ryann Seals',
      discipline: 'Project Management',
      office: 'OfficeBelgrade',
      city: 'Belgrade',
      country: 'Serbia'
    }, {
      id: 31,
      name: 'Tyrone Sheriff',
      discipline: 'Analyst',
      office: 'OfficeSkopje',
      city: 'Skopje',
      country: 'Republic of Macedonia'
    }, {
      id: 32,
      name: 'Mercy Degraffenreid',
      discipline: 'Applications Management',
      office: 'OfficeSkopje',
      city: 'Skopje',
      country: 'Republic of Macedonia'
    }, {
      id: 33,
      name: 'Cher Redden',
      discipline: 'Architecture',
      office: 'OfficeSkopje',
      city: 'Skopje',
      country: 'Republic of Macedonia'
    }, {
      id: 34,
      name: 'Aron Bublitz',
      discipline: 'Development',
      office: 'OfficeSkopje',
      city: 'Skopje',
      country: 'Republic of Macedonia'
    }, {
      id: 35,
      name: 'Kanisha Litteral',
      discipline: 'Testing',
      office: 'OfficeSkopje',
      city: 'Skopje',
      country: 'Republic of Macedonia'
    }, {
      id: 36,
      name: 'Olympia Aston',
      discipline: 'Project Management',
      office: 'OfficeSkopje',
      city: 'Skopje',
      country: 'Republic of Macedonia'
    }, {
      id: 37,
      name: 'Clarita Pass',
      discipline: 'Analyst',
      office: 'OfficeSofia',
      city: 'Sofia',
      country: 'Bulgaria'
    }, {
      id: 38,
      name: 'Kortney Schermerhorn',
      discipline: 'Applications Management',
      office: 'OfficeSofia',
      city: 'Sofia',
      country: 'Bulgaria'
    }, {
      id: 39,
      name: 'Fausto Hackworth',
      discipline: 'Architecture',
      office: 'OfficeSofia',
      city: 'Sofia',
      country: 'Bulgaria'
    }, {
      id: 40,
      name: 'Lawanda Joiner',
      discipline: 'Development',
      office: 'OfficeSofia',
      city: 'Sofia',
      country: 'Bulgaria'
    }, {
      id: 41,
      name: 'Sherwood Hatmaker',
      discipline: 'Testing',
      office: 'OfficeSofia',
      city: 'Sofia',
      country: 'Bulgaria'
    }, {
      id: 42,
      name: 'Shondra August',
      discipline: 'Project Management',
      office: 'OfficeSofia',
      city: 'Sofia',
      country: 'Bulgaria'
    }, {
      id: 43,
      name: 'Mirtha Maharaj',
      discipline: 'Analyst',
      office: 'OfficeBogota',
      city: 'Bogota',
      country: 'Columbia'
    }, {
      id: 44,
      name: 'Hee Auger',
      discipline: 'Applications Management',
      office: 'OfficeBogota',
      city: 'Bogota',
      country: 'Columbia'
    }, {
      id: 45,
      name: 'Rolanfa Kolstad',
      discipline: 'Architecture',
      office: 'OfficeBogota',
      city: 'Bogota',
      country: 'Columbia'
    }, {
      id: 46,
      name: 'Ardelia Danielson',
      discipline: 'Development',
      office: 'OfficeBogota',
      city: 'Bogota',
      country: 'Columbia'
    }, {
      id: 47,
      name: 'Fumiko Moy',
      discipline: 'Testing',
      office: 'OfficeBogota',
      city: 'Bogota',
      country: 'Columbia'
    }, {
      id: 48,
      name: 'Teddy Bhakta',
      discipline: 'Project Management',
      office: 'OfficeBogota',
      city: 'Bogota',
      country: 'Columbia'
    }
  ];


  disciplines = [
    {id: 1, name: 'Analyst'},
    {id: 2, name: 'Applications Management'},
    {id: 3, name: 'Architecture'},
    {id: 4, name: 'Development'},
    {id: 5, name: 'Testing'},
    {id: 6, name: 'Project Management'}
  ];

  jobGrades = [
    {id: 1, name: 'Intern'},
    {id: 2, name: 'Junior Technichian'},
    {id: 3, name: 'Technician'},
    {id: 4, name: 'Senior Technician'},
    {id: 5, name: 'Engineer'},
    {id: 6, name: 'Senior Engineer'},
    {id: 7, name: 'Consultant'},
    {id: 8, name: 'Senior Consultant'},
    {id: 9, name: 'Manager'},
    {id: 10, name: 'Senior Manager'},
    {id: 11, name: 'Business Manager'},
    {id: 12, name: 'Business Director'},
    {id: 13, name: 'Director'}
  ];

  buddies = [
    {id: 1, name: 'Cucu Larisa'},
    {id: 2, name: 'Bujor Alexandru'},
    {id: 3, name: 'Clatinici Eduard'},
    {id: 4, name: 'Grosu Daniela'},
    {id: 5, name: 'Razvan Macedon'},
    {id: 6, name: 'Aurelia Galan'},
    {id: 7, name: 'Dubita Ion'},
    {id: 8, name: 'Maftei Ervin'},
    {id: 9, name: 'Ratcovici Marian'},
    {id: 10, name: 'Victor Victoras'}
  ];

  jwt() {
    const currentUserToken = localStorage.getItem('currentUserToken');
    if (currentUserToken) {
      const headers = new Headers({ 'Authorization':  currentUserToken ,
        'Content-type': 'application/json'});
      return new RequestOptions({ headers: headers });
    }
  }
}
