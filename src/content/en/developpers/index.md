---
title: "Developpers"
language: "en"
---

# Understand the hook system
Twitch-Bot comes with a lot of hooks. A hook is an easy method to launch specific portion of code when events or actions are summoned. 

For example, if you would like to send reply when bot is mentioned, you need to use the `onPing()` hook.

List of all hooks available:

- onConnect (Execute when the bot connect to the channel)
- onMessage (Execute when a new message come in the channel)
- onPing (Execute when someone mention the bot (Ex: @YourBot))
- onPong (Execute every 5 minutes when Twitch send PING status)
- onUsernotice (Execute when user subscribe for example)
- onCommand (Execute when someone send a message with the command symbol, by default `!`)

Each hook receive a `Message` class excerpt the `onCommand` hook, he receive `Command` class with arguments parser

# How to create modules and use hooks ?

1. Create a folder with the name of your module in `/modules` folder (Ex: `/modules/responder`)

2. Create a PHP file named with the name of your module (Ex: `/modules/responder/Responder.php`)

3. Define a class and use TwichtBot module trait like this:

```php
<?php

/**
 * Class Responder
 */
class Responder {

    use \TwitchBot\Module {
        \TwitchBot\Module::__construct as private moduleConstructor;
    }

    /**
     * Responder constructor.
     * @param array $infos
     * @param \TwitchBot\IrcConnect $client
     */
    public function __construct(array $infos, $client)
    {
        $this->moduleConstructor($infos, $client);
    }

    /**
     * @param \TwitchBot\Message $message
     */
    public function onPing($message)
    {
        $this->getClient()->sendMessage('You pinged me @' . $message->getUsername() . ' ?! What do you want ?');
    }
}
```

4. Develop your features using available hooks. The functions names are  `onNameOfTheHook()` (Ex: `onPing($message)`)

5. Create a file `info.json` containing this:
    
    ```
    {
      "name": "Responder",
      "description": "This module make the bot reply when it's mentioned",
      "author" : ["Valentin Deville"]
    }
    ```

6. Refer to the php class `\TwitchBot\Message` or `\TwitchBot\Command` (`/src/class/`) for information about given parameter sent on call

7. Update autoload using this command: `composer dumpautoload` or `./launch.sh` and select `"Dump autoload"`

8. Start your bot using startup script `./launch.sh` or simply launching `php bot.php`


## Config system

You can use your own config system like mysql storage but the framework already has a simple configuration system based on json file.

1. Create a file `config.json` in your module folder

2. Respect json format and convention

3. You can use `getConfig()` and `setConfig()` methods in your code to get and set config from your module

Example file `config.json`:

```
{
	"my_beautifull_config_variable": "Super String"
}
```

In the module:

```php
    public function onPing($message)
    {
		$config_message = $this->getConfig('my_beautifull_config_variable');
		this->getClient()->sendMessage($config_message);
    }
```

# Understand roles

New roles system is available since version 1.4.

You have static variable to define role in `Message` and are filled when the message is process by the core:
```php
    public static $ROLE_SUB = 'ROLE_SUB';

    public static $ROLE_VIP = 'ROLE_VIP';

    public static $ROLE_MOD = 'ROLE_MODERATOR';

    public static $ROLE_OWNER = 'ROLE_OWNER';
```

All methods to check roles are located to `Utils` (`/src/class/Utils.php`)
Shortcut methods in `Utils`:

| Method             	| Param 1                                     	| Param 2                               	| Description                                                         	|
|--------------------	|---------------------------------------------	|---------------------------------------	|---------------------------------------------------------------------	|
| hasRole()          	| String $toCheck Role to be check            	| Message $message The message instance 	| Return true or false if the given role is validate for this message 	|
| hasOneOfRoles()    	| Array $toCheck An array of role to be check 	| Message $message The message instance 	| Return true if one of role checked is validate                      	|
| isViewer()         	| Message $message The message instance       	|                                       	| Return true                                                         	|
| isSub()            	| Message $message The message instance       	|                                       	| Return true if is SUB viewer                                        	|
| isVip()            	| Message $message The message instance       	|                                       	| Return true if is VIP viewer                                        	|
| isMod()            	| Message $message The message instance       	|                                       	| Return true if is moderator                                         	|
| isOwner()          	| Message $message The message instance       	|                                       	| Return true if is the streamer                                      	|
| isMoreThanViewer() 	| Message $message The message instance       	|                                       	| Return true if is not a simple viewer                               	|

Example of use:
```php
    public function onCommand($command)
    {
        switch ($command->getCommand()) {
            case 'setnext':
                (Utils::isOwner($command->getMessage())) ? $this->setNext($command) : false;
                break;
            case 'sethour':
                (Utils::isOwner($command->getMessage())) ? $this->setNext($command) : false;
                break;
            case 'next':
                $this->sendResponse($command);
                break;
            default:
                break;
        }
    }
```

