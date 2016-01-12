module.exports = function(Course) {
    Course.testTeachers = function(sid, cb) {
        var Student = Course.app.models.Student;
        Student.find({include:"teachers", where:{id:sid}}, function(err, res) {
            cb(null, res);
        })
    };
    
    Course.remoteMethod(
        'testTeachers',
        {
            http: {path: '/testTeachers', verb: 'get'}, 
            accepts: [
                {arg: 'sid', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );

    Course.testTeacher = function(sid, cb) {
        Course.find({include:["teacher", "student"], where:{studentId:sid}}, function(err,res) {
            cb(null, res); 
        })
    };
    
    Course.remoteMethod(
        'testTeacher',
        {
            http: {path: '/testTeacher', verb: 'get'}, 
            accepts: [
                {arg: 'sid', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );

    Course.testStudents = function(tid, cb) {
        var Teacher = Course.app.models.Teacher;
        var Student = Course.app.models.Student;
        Teacher.find({include:"students", where:{id:tid}}, function(err, res) {
            cb(null, res);
        })
    };
    
    Course.remoteMethod(
        'testStudents',
        {
            http: {path: '/testStudents', verb: 'get'}, 
            accepts: [
                {arg: 'tid', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );
    Course.testStudent = function(tid, cb) {
        Course.find({include:"student", where:{teacherId:tid}}, function(err,res) {
            cb(null, res); 
        })
    };
    
    Course.remoteMethod(
        'testStudent',
        {
            http: {path: '/testStudent', verb: 'get'}, 
            accepts: [
                {arg: 'tid', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );
}
