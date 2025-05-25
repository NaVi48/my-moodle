<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Block chatbot is defined here.
 *
 * @package     block_chatbot
 * @copyright   2023 Your Name <your.email@example.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Chatbot block.
 *
 * @package    block_chatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class block_chatbot extends block_base {

    /**
     * Initializes block title.
     */
    public function init() {
        $this->title = get_string('pluginname', 'block_chatbot');
    }

    /**
     * Gets the block contents.
     *
     * @return string The block HTML.
     */
    public function get_content() {
        global $OUTPUT;

        if ($this->content !== null) {
            return $this->content;
        }

        $this->content = new stdClass();
        $this->content->text = $OUTPUT->render_from_template('block_chatbot/chatbot', []);
        $this->content->footer = '';

        // Load the JavaScript for the chatbot.
        $this->page->requires->js_call_amd('block_chatbot/chatbot', 'init');

        return $this->content;
    }

    /**
     * Defines where the block can be added.
     *
     * @return array
     */
    public function applicable_formats() {
        return array(
            'all' => true
        );
    }

    /**
     * Allows the block to be added multiple times to a single page.
     *
     * @return boolean
     */
    public function instance_allow_multiple() {
        return false;
    }

    /**
     * Indicates that this block has its own configuration settings.
     *
     * @return boolean
     */
    public function has_config() {
        return true;
    }

    /**
     * Indicates whether the block should be dockable.
     *
     * @return bool
     */
    public function instance_can_be_docked() {
        return false;
    }
}

