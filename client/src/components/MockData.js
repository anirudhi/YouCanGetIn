export var universities = [
    {
        ID : 1,
        name : "University of Waterloo",
        location : "Waterloo, ON",
        average_acc_grade : "87%"
    },
    {
        ID : 2,
        name : "University of Toronto",
        location : "Toronto, ON",
        average_acc_grade : "77%"
    },
    {
        ID : 3,
        name : "McGill University",
        location : "Montréal, QC",
        average_acc_grade : "85%"
    },
    {
        ID : 4,
        name : "University of Western Ontario",
        location : "London, ON",
        average_acc_grade : "81%"
    },
    {
        ID : 5,
        name : "University of British Columbia",
        location : "Vancouver, BC",
        average_acc_grade : "80%"
    },
    {
        ID : 6,
        name : "Ryerson University",
        location : "Toronto, ON",
        average_acc_grade : "79%"
    },
    {
        ID : 7,
        name : "Queens University",
        location : "Kingston, ON",
        average_acc_grade : "80%"
    },
    {
        ID : 8,
        name : "University of Ottawa",
        location : "Ottawa, ON",
        average_acc_grade : "76%"
    },
    {
        ID : 9,
        name : "Harvard",
        location : "Cambridge, MA",
        average_acc_grade : "98%"
    },
    {
        ID : 10,
        name : "Yale College",
        location : "New Haven, CT",
        average_acc_grade : "97%"
    },
    {
        ID : 11,
        name : "Massachusetts Institute of Technology",
        location : "Cambridge, MA",
        average_acc_grade : "97%"
    },
    {
        ID : 12,
        name : "Stanford",
        location : "Stanford, CA",
        average_acc_grade : "99%"
    },
]


export var grades = {
    university_of_waterloo : [
        {
            ID : 1,
            score : 38,
            system : "International Baccalaureate",
            score_percent : 84,
            date : {
                month : "September",
                year : "2016"
            }
        },
        {
            ID : 2,
            score : 36,
            system : "International Baccalaureate",
            score_percent : 80,
            date : {
                month : "September",
                year : "2015"
            }
        },
        {
            ID : 3,
            score : 37,
            system : "International Baccalaureate",
            score_percent : 82,
            date : {
                month : "September",
                year : "2014"
            }
        },
        {
            ID : 4,
            score : 94,
            system : "CBSE",
            score_percent : 94,
            date : {
                month : "September",
                year : "2013"
            }
        },
        {
            ID : 5,
            score : 92,
            system : "CBSE",
            score_percent : 92,
            date : {
                month : "September",
                year : "2013"
            }
        },
    ],
    university_of_toronto : [
        {
            ID : 1,
            score : 35,
            system : "International Baccalaureate",
            score_percent : 77,
            date : {
                month : "September",
                year : "2016"
            }
        },
        {
            ID : 2,
            score : 36,
            system : "International Baccalaureate",
            score_percent : 80,
            date : {
                month : "September",
                year : "2015"
            }
        },
        {
            ID : 3,
            score : 37,
            system : "International Baccalaureate",
            score_percent : 82,
            date : {
                month : "September",
                year : "2014"
            }
        },
        {
            ID : 4,
            score : 94,
            system : "CBSE",
            score_percent : 94,
            date : {
                month : "September",
                year : "2013"
            }
        },
        {
            ID : 5,
            score : 92,
            system : "CBSE",
            score_percent : 92,
            date : {
                month : "September",
                year : "2013"
            }
        },
    ]
};

export var systems = [
    {
        name : "International Baccalaureate",
        total : 45
    },
    {
        name : "CBSE",
        total : 100
    },
    {
        name : "ICSE",
        total : 100
    },
    {
        name : "Canadian",
        total : 100
    },
    {
        name : "American",
        total : 4.0
    },
    {
        name : "A Levels",
        total : 100
    }
];

export var links = [
    {
        title: 'About Us',
        href: '/about'
    },
    {
        title: 'Universities',
        href: '/universities'
    }
];

export var login = {
    username : "test",
    password : "password"
}