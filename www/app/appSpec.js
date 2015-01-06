describe('Module: starter', function() {
  var Starter;

  beforeEach(function() {
    Starter = angular.module('starter') ;
  });

  it('should be registered', function() {
    console.log(Starter);
    expect(Starter).to.be.an('object');

  });

  describe('dependencies', function() {
    var deps;

    var hasModule = function(m){
      return deps.indexOf(m) >= 0;
    };

    before(function() {
      deps = Starter.requires;
    });

    it('should have ionic as a dependency', function() {
      expect(hasModule('ionic')).to.be.true;
    });

    it('should have app.common as a dependency', function() {
      expect(hasModule('app.common')).to.be.true;
    });

    it('should have app.main as a dependency', function() {
      expect(hasModule('app.main')).to.be.true;
    });

    it('should have app.auth as a dependency', function() {
      expect(hasModule('app.auth')).to.be.true;
    });


  });



});
