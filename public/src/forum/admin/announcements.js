"use strict";
/*global define, socket, app, bootbox, templates, ajaxify, RELATIVE_PATH*/

define('forum/admin/announcements', ['uploader', 'forum/admin/iconSelect'], function(uploader, iconSelect) {
    var	Apis = {};

    Apis.init = function() {
        var modified_announcements = {};

        function modified(el) {
            var cid = $(el).parents('li').attr('data-cid');
            if(cid) {
                modified_announcements[cid] = modified_announcements[cid] || {};
                modified_announcements[cid][$(el).attr('data-name')] = $(el).val();
            }
        }

        function save() {
            if(Object.keys(modified_announcements).length) {
                socket.emit('admin.announcements.update', modified_announcements, function(err, result) {
                    if (err) {
                        return app.alertError(err.message);
                    }

                    if (result && result.length) {
                        app.alert({
                            title: 'Updated API Apis',
                            message: 'API Category IDs ' + result.join(', ') + ' was successfully updated.',
                            type: 'success',
                            timeout: 2000
                        });
                    }
                });
                modified_announcements = {};
            }
            return false;
        }

        function update_blockclass(el) {
            el.parentNode.parentNode.className = 'entry-row ' + el.value;
        }

        function updateCategoryOrders() {
            var announcements = $('.admin-announcements #entry-container').children();
            for(var i = 0; i<announcements.length; ++i) {
                var input = $(announcements[i]).find('input[data-name="order"]');

                input.val(i+1).attr('data-value', i+1);
                modified(input);
            }
        }

        $('#entry-container').sortable({
            stop: function(event, ui) {
                updateCategoryOrders();
            },
            distance: 10
        });

        $('.blockclass, .admin-announcements form select').each(function() {
            var $this = $(this);
            $this.val($this.attr('data-value'));
        });

        function showCreateApiModal() {
            $('#new-announcement-modal').modal();
        }

        function createNewApi() {
            var announcement = {
                name: $('#inputName').val(),
                description: $('#inputDescription').val(),
                icon: $('#new-announcement-modal i').attr('value'),
                bgColor: '#3c3c3c',
                color: '#fff',
                order: $('.admin-announcements #entry-container').children().length + 1
            };

            socket.emit('admin.announcements.create', announcement, function(err, data) {
                if(err) {
                    return app.alertError(err.message);
                }

                app.alert({
                    alert_id: 'announcement_created',
                    title: 'Created',
                    message: 'Api Category successfully created!',
                    type: 'success',
                    timeout: 2000
                });

                ajaxify.loadTemplate('admin/announcements', function(adminApis) {
                    var html = $(templates.parse(templates.getBlock(adminApis, 'announcements'), {announcements: [data]}));

                    html.find('[data-name="bgColor"], [data-name="color"]').each(enableColorPicker);

                    $('#entry-container').append(html);
                    $('#new-announcement-modal').modal('hide');
                });
            });
        }

        function enableColorPicker(idx, inputEl) {
            var $inputEl = $(inputEl),
                previewEl = $inputEl.parents('[data-cid]').find('.preview-box');

            admin.enableColorPicker($inputEl, function(hsb, hex) {
                if ($inputEl.attr('data-name') === 'bgColor') {
                    previewEl.css('background', '#' + hex);
                } else if ($inputEl.attr('data-name') === 'color') {
                    previewEl.css('color', '#' + hex);
                }

                modified($inputEl[0]);
            });
        }

        function setupEditTargets() {
            $('[data-edit-target]').on('click', function() {
                var $this = $(this),
                    target = $($this.attr('data-edit-target'));

                $this.addClass('hide');
                target.removeClass('hide').on('blur', function() {
                    $this.removeClass('hide').children('span').html(this.value);
                    $(this).addClass('hide');
                }).val($this.children('span').html());

                target.focus();
            });
        }

        $(function() {
            var url = window.location.href,
                parts = url.split('/'),
                active = parts[parts.length - 1];

            $('.nav-pills li').removeClass('active');
            $('.nav-pills li a').each(function() {
                var $this = $(this);
                if ($this.attr('href').match(active)) {
                    $this.parent().addClass('active');
                    return false;
                }
            });


            $('#addNew').on('click', showCreateApiModal);
            $('#create-announcement-btn').on('click', createNewApi);

            $('#entry-container, #new-announcement-modal').on('click', '.icon', function(ev) {
                iconSelect.init($(this).find('i'), modified);
            });

            $('.admin-announcements form input, .admin-announcements form select').on('change', function(ev) {
                modified(ev.target);
            });

            $('.dropdown').on('click', '[data-disabled]', function(ev) {
                var btn = $(this),
                    announcementRow = btn.parents('li'),
                    cid = announcementRow.attr('data-cid'),
                    disabled = btn.attr('data-disabled') === 'false' ? '1' : '0';

                announcementRow.remove();
                modified_announcements[cid] = modified_announcements[cid] || {};
                modified_announcements[cid].disabled = disabled;

                save();
                return false;
            });

            // Colour Picker
            $('[data-name="bgColor"], [data-name="color"]').each(enableColorPicker);

            $('.admin-announcements').on('click', '.save', save);
            $('.admin-announcements').on('click', '.purge', function() {
                var announcementRow = $(this).parents('li[data-cid]');
                var	cid = announcementRow.attr('data-cid');

                bootbox.confirm('Do you really want to purge this announcement "' + announcementRow.find('#cid-' + cid + '-name').val() + '"?<br/>', function(confirm) {
                    if (!confirm) {
                        return;
                    }
                    socket.emit('admin.announcements.purge', cid, function(err) {
                        if (err) {
                            return app.alertError(err.message);
                        }
                        app.alertSuccess('Api Category purged!');
                        announcementRow.remove();
                    });
                });
            });

            $('.admin-announcements').on('click', '.permissions', function() {
                var	cid = $(this).parents('li[data-cid]').attr('data-cid');
                Apis.launchPermissionsModal(cid);
                return false;
            });


            $('.admin-announcements').on('click', '.upload-button', function() {
                var inputEl = $(this),
                    cid = inputEl.parents('li[data-cid]').attr('data-cid');

                uploader.open(RELATIVE_PATH + '/admin/announcement/uploadpicture', {cid: cid}, 0, function(imageUrlOnServer) {
                    inputEl.val(imageUrlOnServer);
                    var previewBox = inputEl.parents('li[data-cid]').find('.preview-box');
                    previewBox.css('background', 'url(' + imageUrlOnServer + '?' + new Date().getTime() + ')')
                        .css('background-size', 'cover');
                    modified(inputEl[0]);
                });
            });

            $('.admin-announcements').on('click', '.delete-image', function() {
                var parent = $(this).parents('li[data-cid]'),
                    inputEl = parent.find('.upload-button'),
                    preview = parent.find('.preview-box'),
                    bgColor = parent.find('.announcement_bgColor').val();

                inputEl.val('');
                modified(inputEl[0]);

                preview.css('background', bgColor);

                $(this).addClass('hide').hide();
            });

            $('#revertChanges').on('click', function() {
                ajaxify.refresh();
            });

            setupEditTargets();
        });
    };

    Apis.launchPermissionsModal = function(cid) {
        var	modal = $('#announcement-permissions-modal'),
            searchEl = modal.find('#permission-search'),
            resultsEl = modal.find('.search-results.users'),
            groupsResultsEl = modal.find('.search-results.groups'),
            searchDelay;

        // Clear the search field and results
        searchEl.val('');
        resultsEl.html('');

        searchEl.off().on('keyup', function() {
            var	searchEl = this,
                liEl;

            clearTimeout(searchDelay);

            searchDelay = setTimeout(function() {
                socket.emit('admin.announcements.search', {
                    username: searchEl.value,
                    cid: cid
                }, function(err, results) {
                    if(err) {
                        return app.alertError(err.message);
                    }

                    templates.parse('partials/admin/announcements/users', {
                        users: results
                    }, function(html) {
                        resultsEl.html(html);
                    });
                });
            }, 250);
        });

        Apis.refreshPrivilegeList(cid);

        resultsEl.off().on('click', '[data-priv]', function(e) {
            var	anchorEl = $(this),
                uid = anchorEl.parents('li[data-uid]').attr('data-uid'),
                privilege = anchorEl.attr('data-priv');
            e.preventDefault();
            e.stopPropagation();

            socket.emit('admin.announcements.setPrivilege', {
                cid: cid,
                uid: uid,
                privilege: privilege,
                set: !anchorEl.hasClass('active')
            }, function(err) {
                if (err) {
                    return app.alertError(err.message);
                }
                anchorEl.toggleClass('active', !anchorEl.hasClass('active'));
                Apis.refreshPrivilegeList(cid);
            });
        });

        modal.off().on('click', '.members li > img', function() {
            searchEl.val($(this).attr('title'));
            searchEl.keyup();
        });

        // User Groups and privileges
        socket.emit('admin.announcements.groupsList', cid, function(err, results) {
            if(err) {
                return app.alertError(err.message);
            }

            templates.parse('partials/admin/announcements/groups', {
                groups: results
            }, function(html) {
                groupsResultsEl.html(html);
            });
        });

        groupsResultsEl.off().on('click', '[data-priv]', function(e) {
            var	anchorEl = $(this),
                name = anchorEl.parents('li[data-name]').attr('data-name'),
                privilege = anchorEl.attr('data-priv');
            e.preventDefault();
            e.stopPropagation();

            socket.emit('admin.announcements.setGroupPrivilege', {
                cid: cid,
                name: name,
                privilege: privilege,
                set: !anchorEl.hasClass('active')
            }, function(err) {
                if (!err) {
                    anchorEl.toggleClass('active');
                }
            });
        });

        modal.modal();
    };

    Apis.refreshPrivilegeList = function (cid) {
        var	modalEl = $('#announcement-permissions-modal'),
            memberList = $('.members');

        socket.emit('admin.announcements.getPrivilegeSettings', cid, function(err, privilegeList) {
            var	membersLength = privilegeList.length,
                liEl, x, userObj;

            memberList.html('');
            if (membersLength > 0) {
                for(x = 0; x < membersLength; x++) {
                    userObj = privilegeList[x];
                    liEl = $('<li/>').attr('data-uid', userObj.uid).html('<img src="' + userObj.picture + '" title="' + userObj.username + '" />');
                    memberList.append(liEl);
                }
            } else {
                liEl = $('<li/>').addClass('empty').html('None.');
                memberList.append(liEl);
            }
        });
    };

    return Apis;
});