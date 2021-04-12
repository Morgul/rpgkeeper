//----------------------------------------------------------------------------------------------------------------------
// V20 System
//
// @module
//----------------------------------------------------------------------------------------------------------------------

import express from 'express';
// import logging from 'omega-logger';

import models from './models';
import systemMan from '../manager';

// Routes
// import raceRouter from './routes/races';
// import classRouter from './routes/classes';
// import featRouter from './routes/feats';
// import spellRouter from './routes/spells';

// Initial Data
// import InitialRaces from './initial/races.json';
// import InitialClasses from './initial/classes.json';
// import InitialFeats from './initial/feats.json';
// import InitialSpells from './initial/spells.json';

//----------------------------------------------------------------------------------------------------------------------

// const logger = logging.loggerFor(module);

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// Setup Router
//----------------------------------------------------------------------------------------------------------------------

// router.use('/races', raceRouter);
// router.use('/classes', classRouter);
// router.use('/feats', featRouter);
// router.use('/spells', spellRouter);

//----------------------------------------------------------------------------------------------------------------------
// Register System
//----------------------------------------------------------------------------------------------------------------------

const id = 'V20';
const name = 'Vampire: The Masquerade (20th Anniversary Edition)';
const description = 'This system was built for V20, but should work for original VtM as well.';

systemMan.register(id, name, description, router, models);
systemMan.buildGeneralEndpoints(router, models);

//----------------------------------------------------------------------------------------------------------------------
// Data Loading Helpers
//----------------------------------------------------------------------------------------------------------------------

// function createOrUpdateModel(Model, initialData)
// {
//     return Model.get(initialData.id)
//         .then((instance) =>
//         {
//             // Update Class
//             _.merge(instance, initialData);
//             return instance.$save();
//         })
//         .catch(models.errors.DocumentNotFound, () =>
//         {
//             // Add Class
//             var instance = new Model(initialData);
//             return instance.$save();
//         });
// } // end createOrUpdateModel
//
// function loadInitial(Model, initialData)
// {
//     return Promise.each(_.values(initialData), (data) =>
//     {
//         return createOrUpdateModel(Model, data);
//     });
// } // end loadInitial

//----------------------------------------------------------------------------------------------------------------------
// System Setup
//----------------------------------------------------------------------------------------------------------------------

// export default Promise.resolve()
//     .then(() => { return loadInitial(models.Race, InitialRaces); })
//     .then(() => { return loadInitial(models.Class, InitialClasses); })
//     .then(() => { return loadInitial(models.Feat, InitialFeats); })
//     .then(() => { return loadInitial(models.Spell, InitialSpells); })
//     .then(() => { logger.info('[dnd35] Loading initial data done.') });

//----------------------------------------------------------------------------------------------------------------------
