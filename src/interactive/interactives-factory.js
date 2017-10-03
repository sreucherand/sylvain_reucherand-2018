import Factory from '../factory/factory';

import InteractiveGallery from './interactive-gallery';

class InteractivesFactory extends Factory {}

const factory = new InteractivesFactory();

factory.register('gallery', InteractiveGallery);

export default factory;
