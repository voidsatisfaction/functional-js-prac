// Arrow function cannot be the constructor
export const Container = function(val) {
  this.value = val;
};

Container.of = function(value) {
  return new Container(value);
};

Container.prototype.map = function(fn) {
  return Container.of(fn(this.value));
};

export const MayBe = function(val) {
  this.value = val;
};

// MayBe
MayBe.of = function(val) {
  return new MayBe(val);
};

MayBe.prototype.isNothing = function() {
  return (this.value === null || this.value === undefined);
};

MayBe.prototype.map = function(fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};
