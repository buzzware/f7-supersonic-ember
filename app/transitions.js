export default function(){

  this.transition(
    this.toRoute('settings'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

}
