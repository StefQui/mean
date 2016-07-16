'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Orga = mongoose.model('Orga'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  orga;

/**
 * Orga routes tests
 */
describe('Orga CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new orga
    user.save(function () {
      orga = {
        title: 'Orga Title',
        content: 'Orga Content'
      };

      done();
    });
  });

  it('should be able to save an orga if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new orga
        agent.post('/api/orgas')
          .send(orga)
          .expect(200)
          .end(function (orgaSaveErr, orgaSaveRes) {
            // Handle orga save error
            if (orgaSaveErr) {
              return done(orgaSaveErr);
            }

            // Get a list of orgas
            agent.get('/api/orgas')
              .end(function (orgasGetErr, orgasGetRes) {
                // Handle orga save error
                if (orgasGetErr) {
                  return done(orgasGetErr);
                }

                // Get orgas list
                var orgas = orgasGetRes.body;

                // Set assertions
                (orgas[0].user._id).should.equal(userId);
                (orgas[0].title).should.match('Orga Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an orga if not logged in', function (done) {
    agent.post('/api/orgas')
      .send(orga)
      .expect(403)
      .end(function (orgaSaveErr, orgaSaveRes) {
        // Call the assertion callback
        done(orgaSaveErr);
      });
  });

  it('should not be able to save an orga if no title is provided', function (done) {
    // Invalidate title field
    orga.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new orga
        agent.post('/api/orgas')
          .send(orga)
          .expect(400)
          .end(function (orgaSaveErr, orgaSaveRes) {
            // Set message assertion
            (orgaSaveRes.body.message).should.match('Title cannot be blank');

            // Handle orga save error
            done(orgaSaveErr);
          });
      });
  });

  it('should be able to update an orga if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new orga
        agent.post('/api/orgas')
          .send(orga)
          .expect(200)
          .end(function (orgaSaveErr, orgaSaveRes) {
            // Handle orga save error
            if (orgaSaveErr) {
              return done(orgaSaveErr);
            }

            // Update orga title
            orga.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing orga
            agent.put('/api/orgas/' + orgaSaveRes.body._id)
              .send(orga)
              .expect(200)
              .end(function (orgaUpdateErr, orgaUpdateRes) {
                // Handle orga update error
                if (orgaUpdateErr) {
                  return done(orgaUpdateErr);
                }

                // Set assertions
                (orgaUpdateRes.body._id).should.equal(orgaSaveRes.body._id);
                (orgaUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of orgas if not signed in', function (done) {
    // Create new orga model instance
    var orgaObj = new Orga(orga);

    // Save the orga
    orgaObj.save(function () {
      // Request orgas
      request(app).get('/api/orgas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single orga if not signed in', function (done) {
    // Create new orga model instance
    var orgaObj = new Orga(orga);

    // Save the orga
    orgaObj.save(function () {
      request(app).get('/api/orgas/' + orgaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', orga.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single orga with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/orgas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Orga is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single orga which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent orga
    request(app).get('/api/orgas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No orga with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an orga if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new orga
        agent.post('/api/orgas')
          .send(orga)
          .expect(200)
          .end(function (orgaSaveErr, orgaSaveRes) {
            // Handle orga save error
            if (orgaSaveErr) {
              return done(orgaSaveErr);
            }

            // Delete an existing orga
            agent.delete('/api/orgas/' + orgaSaveRes.body._id)
              .send(orga)
              .expect(200)
              .end(function (orgaDeleteErr, orgaDeleteRes) {
                // Handle orga error error
                if (orgaDeleteErr) {
                  return done(orgaDeleteErr);
                }

                // Set assertions
                (orgaDeleteRes.body._id).should.equal(orgaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an orga if not signed in', function (done) {
    // Set orga user
    orga.user = user;

    // Create new orga model instance
    var orgaObj = new Orga(orga);

    // Save the orga
    orgaObj.save(function () {
      // Try deleting orga
      request(app).delete('/api/orgas/' + orgaObj._id)
        .expect(403)
        .end(function (orgaDeleteErr, orgaDeleteRes) {
          // Set message assertion
          (orgaDeleteRes.body.message).should.match('User is not authorized');

          // Handle orga error error
          done(orgaDeleteErr);
        });

    });
  });

  it('should be able to get a single orga that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new orga
          agent.post('/api/orgas')
            .send(orga)
            .expect(200)
            .end(function (orgaSaveErr, orgaSaveRes) {
              // Handle orga save error
              if (orgaSaveErr) {
                return done(orgaSaveErr);
              }

              // Set assertions on new orga
              (orgaSaveRes.body.title).should.equal(orga.title);
              should.exist(orgaSaveRes.body.user);
              should.equal(orgaSaveRes.body.user._id, orphanId);

              // force the orga to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the orga
                    agent.get('/api/orgas/' + orgaSaveRes.body._id)
                      .expect(200)
                      .end(function (orgaInfoErr, orgaInfoRes) {
                        // Handle orga error
                        if (orgaInfoErr) {
                          return done(orgaInfoErr);
                        }

                        // Set assertions
                        (orgaInfoRes.body._id).should.equal(orgaSaveRes.body._id);
                        (orgaInfoRes.body.title).should.equal(orga.title);
                        should.equal(orgaInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single orga if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new orga model instance
    orga.user = user;
    var orgaObj = new Orga(orga);

    // Save the orga
    orgaObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user.id;

          // Save a new orga
          agent.post('/api/orgas')
            .send(orga)
            .expect(200)
            .end(function (orgaSaveErr, orgaSaveRes) {
              // Handle orga save error
              if (orgaSaveErr) {
                return done(orgaSaveErr);
              }

              // Get the orga
              agent.get('/api/orgas/' + orgaSaveRes.body._id)
                .expect(200)
                .end(function (orgaInfoErr, orgaInfoRes) {
                  // Handle orga error
                  if (orgaInfoErr) {
                    return done(orgaInfoErr);
                  }

                  // Set assertions
                  (orgaInfoRes.body._id).should.equal(orgaSaveRes.body._id);
                  (orgaInfoRes.body.title).should.equal(orga.title);

                  // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                  (orgaInfoRes.body.isCurrentUserOwner).should.equal(true);

                  // Call the assertion callback
                  done();
                });
            });
        });
    });
  });

  it('should be able to get a single orga if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new orga model instance
    var orgaObj = new Orga(orga);

    // Save the orga
    orgaObj.save(function () {
      request(app).get('/api/orgas/' + orgaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', orga.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single orga, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'temp',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create temporary user
    var _user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _user.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Orga
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user._id;

          // Save a new orga
          agent.post('/api/orgas')
            .send(orga)
            .expect(200)
            .end(function (orgaSaveErr, orgaSaveRes) {
              // Handle orga save error
              if (orgaSaveErr) {
                return done(orgaSaveErr);
              }

              // Set assertions on new orga
              (orgaSaveRes.body.title).should.equal(orga.title);
              should.exist(orgaSaveRes.body.user);
              should.equal(orgaSaveRes.body.user._id, userId);

              // now signin with the temporary user
              agent.post('/api/auth/signin')
                .send(_creds)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the orga
                  agent.get('/api/orgas/' + orgaSaveRes.body._id)
                    .expect(200)
                    .end(function (orgaInfoErr, orgaInfoRes) {
                      // Handle orga error
                      if (orgaInfoErr) {
                        return done(orgaInfoErr);
                      }

                      // Set assertions
                      (orgaInfoRes.body._id).should.equal(orgaSaveRes.body._id);
                      (orgaInfoRes.body.title).should.equal(orga.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (orgaInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Orga.remove().exec(done);
    });
  });
});
