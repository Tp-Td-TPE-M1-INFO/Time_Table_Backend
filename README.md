***********************EndPoint****************************
        

        login
login to any user : /api/login 

        Students endpoint
+ register : /api/student/register
+ get one student : /api/student/info/:id
+ get all students : /api/student/all
+ update student : /api/student/update
+ delete student : /api/student/delete
+ update profil : /api/student/profil
+ delete profil : /api/student/deleteProfil

        teachers endpoint
+ register : /api/teacher/register
+ get one teacher : /api/teacher/info/:id
+ get all teachers : /api/teacher/all
+ update teacher : /api/teacher/update
+ delete teacher : /api/teacher/delete
+ update profil : /api/teacher/profil/:id
+ delete profil : /api/teacher/deleteProfil/:id

        Halls endpoint
+ get all halls: /api/hall/allHalls
+ get one hall : /api/hall/:id
+ create hall : /api/hall/create
+ update hall : /api/hall/update/:id
+ delete hall: /api/hall/delete/:id
  
        UE endpoint

+ get all ues(GET): api/ue
+ create ue(POST): api/ue
+ get one ue(GET): api/ue/id
+ update ue(PUT): api/ue/id
+ delete ue(DELETE): api/ue/id

        Sector endpoint
+ get all sectors(GET): api/sector
+ create sector(POST): api/sector
+ get one sector(GET): api/sector/id
+ update sector(PUT): api/sector/id
+ delete sector(DELETE): api/sector/id

        Level endpoint
+ get all levels(GET): api/level
+ create level(POST): api/level
+ get one level(GET): api/level/id
+ update level(PUT): api/level/id
+ delete level(DELETE): api/level/id

        Class endpoint
+ get all classes(GET): api/class
+ create class(POST): api/class
+ get one class(GET): api/class/id
+ update class(PUT): api/class/id
+ delete class(DELETE): api/class/id


        Course endPoints : 
create course(POST) : /api/course/create
update course(PATCH) : /api/course/update/id
delete course(DELETE) : /api/course/delete/id
get one course(GET) : /api/course/getCourse/id
get all course(GET) : /api/course/getCourse

        Event endPoints

create event(POST) : /api/event/create
update event(PATCH) : /api/event/update/id
delete event(DELETE) : /api/event/delete/id
get one event(GET) : /api/event/getEvent/id
get all event(GET) : /api/event/getEvent

        Plannig endPoints
get all planning (GET) : /api/planning
get classe planning(GET) : /api/planning/id
get hall planning(GET) : /api/planning/id
get teacher planning(GET) : /api/planning/id

