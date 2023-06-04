***********************EndPoint****************************
        

        login
login to any user : /api/login 

        Students endpoint
register : /api/student/register
get one student : /api/student/info/:id
get all students : /api/student/all
update student : /api/student/update
delete student : /api/student/delete
update profil : /api/student/profil
delete profil : /api/student/deleteProfil

        teachers endpoint
register : /api/teacher/register
get one teacher : /api/teacher/info/:id
get all teachers : /api/teacher/all
update teacher : /api/teacher/update
delete teacher : /api/teacher/delete
update profil : /api/teacher/profil/:id
delete profil : /api/teacher/deleteProfil/:id

        Halls endpoint
get all halls: /api/hall/getHalls
get one hall : /api/hall/:hallID
create hall : /api/hall/create
update hall : /api/hall/update/:hallID
delete hall: /api/hall/delete/:hallID
CRUD UE endpoints

get all ues(GET): api/ue
create ue(POST): api/ue
get one ue(GET): api/ue/id
update ue(PUT): api/ue/id
delete ue(DELETE): api/ue/id

CRUD Sector endpoints
get all sectors(GET): api/sector
create sector(POST): api/sector
get one sector(GET): api/sector/id
update sector(PUT): api/sector/id
delete sector(DELETE): api/sector/id

CRUD level endpoints
get all levels(GET): api/level
create level(POST): api/level
get one level(GET): api/level/id
update level(PUT): api/level/id
delete level(DELETE): api/level/id

CRUD class endpoints
get all classes(GET): api/class
create class(POST): api/class
get one class(GET): api/class/id
update class(PUT): api/class/id
delete class(DELETE): api/class/id