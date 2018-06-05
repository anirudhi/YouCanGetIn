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
]


export var grades = {
    university_of_waterloo : [
        {
            ID : 1,
            score : 38,
            system : "International Baccalaureate",
            score_percent : 84
        },
        {
            ID : 2,
            score : 36,
            system : "International Baccalaureate",
            score_percent : 80
        },
        {
            ID : 3,
            score : 37,
            system : "International Baccalaureate",
            score_percent : 82
        },
        {
            ID : 4,
            score : 94,
            system : "CBSE",
            score_percent : 94
        },
        {
            ID : 5,
            score : 92,
            system : "CBSE",
            score_percent : 92
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