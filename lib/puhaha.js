'use babel';

import PuhahaView from './puhaha-view';
import { CompositeDisposable } from 'atom';

export default {

  puhahaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.puhahaView = new PuhahaView(state.puhahaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.puhahaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'puhaha:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.puhahaView.destroy();
  },

  serialize() {
    return {
      puhahaViewState: this.puhahaView.serialize()
    };
  },

  toggle() {
    console.log('Puhaha was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
