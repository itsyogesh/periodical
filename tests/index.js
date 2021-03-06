var server = require('../server')
    boot = server.boot,
    shutdown = server.shutdown,
    port = server.port,
    superagent = require('superagent'),
    expect = require('expect.js');

describe('server', function(){
    before(function(){
        boot();
    });
    
    describe('homepage', function(){
        it('should respond to GET', function(done){
            superagent
                .get('http://localhost:' + port)
                .end(function(err, res){
                    expect(res.status).to.be(200);
                    done()
                })
        });
    });
    after(function () {
        shutdown();
    });
});


