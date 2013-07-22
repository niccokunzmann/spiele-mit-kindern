Das Ball Objekt
----------------
Methoden:
- [Ball>>starten] (Ball_starten.jpg)
- [Ball>>reset] (Ball_reset.jpg)
- [Ball>>punkten] (Ball_punkten.jpg)
- [Ball>>abprallen] (Ball_abprallen.jpg)
- [Ball>>bewegen] (Ball_bewegen.jpg)





Die Methode `starten` setzt die Punktestände der Spieler einmal zurück und führt einmal die Methode 
`reset` aus. Danach beendet sie sich selbst.

Die Methode `reset` startet den Ball von der Mitte in eine zufällige Richtung.

Die Methode `punkten` prüft, ob der Ball mit dem roten oder Baluen Spielfeldrand des jeweiligen Spielers 
in Berührung ist. Falls ja bekommt der entsprechende Spieler einen Punkt und die Methode `reset` wird 
aufgerufen.

Die Methode `abprallen` prüft, ob der Ball mit einem der Schieber überlappt und prallt dann relativ 
zu dessen Mittelpunkt vom Schieber ab.

Die Methode `bewegen` wirde während das Spiel Läuft endlos ausgeführt. Die methoden `punkten` und 
`abprallen`werden aufgerufen, danach wird der Ball entsprechend seiner Richtung bewegt.
