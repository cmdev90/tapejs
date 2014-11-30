module.exports.GET = {
    '/' : {
        'controller' : 'project',
        'function' : 'index',
        'protected' : true
    },

    '/project/:id(*[0-9])' : {
        'controller' : 'project',
        'function' : 'findOne'
    },

    '/projects' : {
      'controller' : 'project',
      'function' : 'findAll'
    },
    
    '/user/:id(*[0-9])' : {
        'controller' : 'user',
        'function' : 'retrieve'
    },

    '/login' : {
        'controller' : 'login',
        'function' : 'login'
    }

};


module.exports.POST = {
    '/project' : {
        'controller' : 'project',
        'function' : 'create_project'
    },

    '/objective/project/:id(*[0-9])' : {
        'controller' : 'project',
        'function' : 'create_objective'
    },

    '/outcome/objective/:id(*[0-9])' : {
        'controller' : 'project',
        'function' : 'create_outcome'
    },

    '/output/outcome/:id(*[0-9])' : {
        'controller' : 'project',
        'function' : 'create_output'
    },

    '/user' : {
        'controller' : 'user',
        'function' : 'create'
    }
};


module.exports.PUT = {
    '/' : {
        'controller' : 'test',
        'function' : 'func1'
    },
};


module.exports.DELETE = {
    '/object/:id(*[0-9])' : {
        'controller' : 'project',
        'function' : 'delete'
    },
};

