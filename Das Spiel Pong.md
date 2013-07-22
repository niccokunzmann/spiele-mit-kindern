Malen:
------
- zwei Schieber, für rechts und links
- ein Ball
- Verschieden farbige Ränder(rechts und links)

[Bild vom Spielfeld mit Elementen] (PongSpielfeld.jpg)

Elemente:
---------
- Spielfeld (Objektkatalog->Graphen)
- 4 KeyPressMorph (Objectkatalog->Dies und das)
  - für jeden der Schieber eine Taste für nach oben und eine für nach unten
  - [So könnte das aussehen] (KeyPressMorph.jpg)

Das Ball Objekt:
----------------
Methoden:
- Ball>>bewegen
  - 
- Ball>>abprallen
- Ball>>Punkten
- Ball>>reset
- Ball>>starten

Variablen:
- Balls>>winkel

Ein Schieber:
-------------
Methoden:
- Schieber>>hoch
- Schieber>>runter

Variablen:
- Schiebers>>geschwindigkeit
- Schiebers>>posCache
 

Ein KeyPressMorph:
------------------
Methoden:
- tastendruck
